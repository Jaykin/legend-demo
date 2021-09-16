// 条件编译
// 可以尝试用 gulp-ifdef 替换
const through = require('through2');
const XRegExp = require('xregexp');
const chalk = require('chalk');
const _ = require('lodash');
const rename = require('gulp-rename');

const { WEAPP_TYPES } = require('../constant');

// 规则
const scriptRule = {
    start: '[ \t]*(?://|/\\*{1,2})[ \t]*#(ifndef|ifdef|if)[ \t]+([^\n*]*)(?:\\*(?:\\*|/))?(?:[ \t]*\n+)?',
    end: '[ \t]*(?://|/\\*{1,2})[ \t]*#endif[ \t]*(?:\\*(?:\\*|/))?(?:[ \t]*\n)?',
};
const ifdefRules = {
    tmpl: {
        start: '[ \t]*<!--[ \t]*#(ifndef|ifdef|if)[ \t]+(.*?)[ \t]*(?:-->|!>)(?:[ \t]*\n+)?',
        end: '[ \t]*<!(?:--)?[ \t]*#endif[ \t]*(?:-->|!>)(?:[ \t]*\n)?'
    },
    script: scriptRule,
    style: scriptRule,
    config: scriptRule,
    tmplscript: scriptRule,
};

/**
 * @param {Buffer|String} contents - 内容
 * @param {String} platform - 平台标识 wx/tt 等
 * @param {String} type - 文件类型 tmpl/script/style/config
 * @return {String} - 处理后的内容
*/
function preprocess(contents, platform, type) {
    let rv = contents.toString();
    const rule = ifdefRules[type];
    const startRegex = new RegExp(rule.start, 'mi');
    const endRegex = new RegExp(rule.end, 'mi');
    const matches = XRegExp.matchRecursive(rv, rule.start, rule.end, 'gmi', {
        valueNames: ['between', 'left', 'match', 'right'],
    });
    let matchGroup = {
        left: null,
        match: null,
        right: null,
    };
    rv = matches.reduce((builder, match) => {
        switch (match.name) {
            case 'between':
                builder += match.value;
                break;
            case 'left':
                matchGroup.left = startRegex.exec(match.value);
                break;
            case 'match':
                matchGroup.match = match.value;
                break;
            case 'right':
                matchGroup.right = endRegex.exec(match.value);
                builder += processor(matchGroup.left, matchGroup.right, matchGroup.match, platform);
                break;
        }
        return builder;
    }, '');

    // json 文件去除末尾多余逗号
    if (type === 'config') {
        rv = rv.replace(/,(\s*\})$/, '$1');
    }

    return rv;
}

// 条件是否通过，支持 wx||tt 形式
function isPass(test, context) {
    return test.replace(/\s/g, '').split('||').indexOf(context) > -1;
}

function processor(startMatches, endMatches, match, platform) {
    const variant = startMatches[1];
    const condition = (startMatches[2] || '').trim();
    switch (variant) {
        case 'if':
        case 'ifdef':
            return isPass(condition, platform) ? match : '';
        case 'ifndef':
            return isPass(condition, platform) ? '' : match;
        default:
            console.log(chalk.red(`不支持的条件编译语法：${variant}`));
            return match;
    }
}

module.exports = function ifdefPlugin(compiler) {
    const extMap = _.invert(compiler.srcConfig.adapters.ext);
    const platform = compiler.platform;
    
    return through.obj(function(file, encode, cb) {
        // 文件维度
        const stem = file.stem;
        let weapp = '';
        let reg = '';
        const isWeappFile = WEAPP_TYPES.some(type => {
            reg = new RegExp(`(\\.${type})$`, 'g');
            weapp = type;
            return reg.test(stem);
        });
        if (isWeappFile) {
            if (platform === weapp) {
                // 重命名有本平台标识的文件，去掉平台标识
                rename((path) => {
                    path.basename = stem.replace(reg, '');
                })._transform(file, encode, cb);
            } else {
                // 不处理非本平台标识的文件
                cb();
            }
            return;
        }

        // 代码块维度
        file.contents = Buffer.from(preprocess(file.contents, compiler.platform, extMap[file.extname]));
        // 以下是例行公事
        this.push(file);
        cb();
    });
};