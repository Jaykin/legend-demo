// 转换 api
const through = require('through2');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generator = require('@babel/generator').default;
// const t = require('@babel/types');
const chalk = require('chalk');
const _ = require('lodash');

module.exports = function transformGlobalPlugin(compiler) {
    const globalAdapter = compiler.config.adapters.global;

    return through.obj(function(file, encode, cb) {
        const contents = file.contents.toString();
        const ast = parser.parse(contents, {
            sourceType: 'module',
            // 可以在这里引入 ES6+ 的支持
            plugins: [
                'exportDefaultFrom',
                'exportNamespaceFrom'
            ],
            strictMode: true,       // 严格模式
        });

        // 替换全局对象 & 方法
        traverse(ast, {
            Identifier(path) {
                const node = path.node;
                const nodeName = node.name;
                // 剔除继承属性 和 __proto__
                const apiOpt = _.has(globalAdapter, nodeName) ? globalAdapter[nodeName] : null;

                if (_.isPlainObject(apiOpt)) {
                    if (!apiOpt.mapping) {
                        console.log(chalk.red(`${apiOpt.message} ${file.path}`));
                        return;
                    }

                    node.name = apiOpt.mapping;
                }
            }
        });

        file.contents = Buffer.from(generator(ast, {
            compact: false,
        }).code);
        this.push(file);
        cb();
    });
};