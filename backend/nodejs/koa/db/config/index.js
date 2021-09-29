/**
 * 读取数据库配置
*/
const env = process.env.NODE_ENV;
let config = '';

if (env === 'test') {
    config = require('./test');
} else if (env === 'develop') {
    config = require('./dev');
} else if (env === 'production') {
    config = require('./prod');
} else {
    config = require('./dev');  // 默认使用开发环境的配置
}

module.exports = config;
