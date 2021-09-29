/**
 * log info
 * @param {String} msg log出的信息
 */
const logger = (msg) => {
    console.log(`${process.env.__PROJECT_PREFIX__} ${msg}`);
};


module.exports = logger;
