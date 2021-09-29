// 转换模板
const path = require('path');

const through = require('through2');
const { parse, stringify } = require('../parser/template');     // fork himalaya（TODO: 后续实现完全自定义，调研下 fastparse）
const _ = require('lodash');

const refTags = ['include', 'import'];  // 模板引用标签

function recursiveChildren(obj, func) {
    const { children } = obj;
    if (children && children.length) {
        children.forEach(child => {
            if (func && func(child)) {
                recursiveChildren(child, func);
            }
        });
    }
}

module.exports = function transformTmplPlugin(compiler) {
    const tmplAdapter = compiler.config.adapters.tmpl;
    const tmplDirective = tmplAdapter.directive;
    const tmplDirectiveMap = _.invert(compiler.srcConfig.adapters.tmpl.directive);
    const tarExts = compiler.config.adapters.ext;
    const extMap = _.invert(compiler.srcConfig.adapters.ext);
    const scriptTag = tmplAdapter.scriptTag;    // 模板脚本标签名

    return through.obj(function(file, encode, cb) {
        const contents = file.contents.toString();
        const json = parse(contents, {
            childlessTags: [scriptTag],   // 暂时忽略解析的标签
        });
        // TODO 转换数据绑定语法
        recursiveChildren({ children: json }, (child) => {
            if (child.type === 'element') {
                child.attributes.forEach(attr => {
                    // 转换标签指令
                    const directive = tmplDirectiveMap[attr.key];
                    if (directive) {
                        attr.key = tmplDirective[directive];
                    }

                    // 修改引用标签
                    if (refTags.indexOf(child.tagName) > -1) {
                        // 修改 src 路径文件后缀名
                        const src = attr.key === 'src' ? attr.value : '';
                        if (src) {
                            const srcExt = path.extname(src);
                            const tarExt = tarExts[extMap[srcExt]];
                            if (srcExt && tarExt) {
                                attr.value = src.replace(new RegExp(`(\\${srcExt})$`, 'g'), tarExt);
                            }
                        }
                    }
                });
                return true;
            }
        });

        file.contents = Buffer.from(stringify(json));
        this.push(file);
        cb();
    });
};