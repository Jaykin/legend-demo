/**
 * css-loader
 * 解析样式模块
*/
const postcss = require('postcss');
const postcssPkg = require('postcss/package.json');
const {
    getOptions
} = require('loader-utils');

module.exports = function loader(content, map, meta) {
    const options = getOptions(this) || {};
    // const callback = this.async();

    // 重用 CSS AST，避免重新解析，如：postcss-loader 会存储解析结果，此时使用即可
    console.log(2222);
    this.callback(null, content);
}