/**
 * style-loader
 * 将样式插入 DOM 中
*/

const path = require('path');

const loaderUtils = require('loader-utils');
const validateOptions = require('schema-utils');

const schema = JSON.stringify({
    "type": "object",
    "properties": {
        "injectType": {
        "description": "Allows to setup how styles will be injected into DOM (https://github.com/webpack-contrib/style-loader#injecttype).",
        "enum": [
            "styleTag",
            "singletonStyleTag",
            "lazyStyleTag",
            "lazySingletonStyleTag",
            "linkTag"
        ]
        },
        "attributes": {
            "description": "Adds custom attributes to tag (https://github.com/webpack-contrib/style-loader#attributes).",
            "type": "object"
        },
        "insert": {
            "description": "Inserts `<style>`/`<link>` at the given position (https://github.com/webpack-contrib/style-loader#insert).",
            "anyOf": [
                {
                    "type": "string"
                },
                {
                    "instanceof": "Function"
                }
            ]
        },
        "base": {
            "description": "Sets module ID base for DLLPlugin (https://github.com/webpack-contrib/style-loader#base).",
            "type": "number"
        }
    },
    "additionalProperties": false
});

module.exports = (a,b,meta) => {console.log(meta)};

module.exports.pitch = function styleLoader(remainingRequest, precedingRequest, data) {
    // console.log('remainingRequest', remainingRequest);
    // console.log('precedingRequest', precedingRequest);
    // console.log('data', data);
    /**
     * options 配置项
     * @property {string|function} [options.insert=head] - 插入位置，默认在 <head> 标签内
     * @property {string} [options.injectType=styleTag] - 插入类型，默认为 <style> 标签
     * @property {string} [options.attributes={}] - 需要为样式标签添加的属性，如 { id: 'customId' }
     * @property {number} [options.base=true] - Sets module ID base (DLLPlugin)
    */
    const options = loaderUtils.getOptions(this) || {};

    validateOptions(schema, options, {
        name: 'Style Loader',
        baseDataPath: 'options',
    });

    // 插入位置
    const insert = 
        typeof options.insert === 'undefined'
        ? 'head'
        : typeof typeof options.insert === 'string'
        ? JSON.stringify(options.insert)
        : options.insert.toString();
    
    // 插入类型
    const injectType = options.injectType || 'styleTag';

    switch(injectType) {
        case 'linkTag':
        // 按需插入多个 <style></style>
        case 'lazyStyleTag':
        case 'lazySingletonStyleTag':
        // 多个 <style></style>，是怎么分的，按引入文件的个数么？    
        case 'styleTag':
        // 单个 <style></style>   
        case 'singletonStyleTag':
        default 
    }
}