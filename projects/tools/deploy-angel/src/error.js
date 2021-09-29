/**
 * 拼接出错提示的字符串
 * @param {String} err 异常
 */
const error = err => new Error(`${process.env.__PROJECT_PREFIX__} ${err}`);

module.exports = error;
