const logger = require('./logger');
const error  = require('./error');

/**
 * 在命令行中输出提示，并接收用户输入的信息
 * @param {String} promptMsg 在命令行中输出的提示信息
 * @return {Promise} 用户输入的信息
 */
const puts = (promptMsg) => {
    if (!promptMsg || typeof promptMsg !== 'string') {
        throw error('puts 方法必须传入一个参数，类型为字符串，请检查');
    }

    return new Promise((resolve) => {
        logger(promptMsg);

        process.stdin.setEncoding('utf-8');
        process.stdin.on('data', (chunk) => {
            // 如果用户不输入，或者输入一串空格
            if (!chunk.trim()) {
                logger(promptMsg);
            } else {
                resolve(chunk);
            }
        });
    });
};

module.exports = puts;
