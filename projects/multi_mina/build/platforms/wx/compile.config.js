/**
 * 微信端编译时配置
*/

// adapters
const ext = require('./adapters/ext');
const tmpl = require('./adapters/tmpl');
const global = require('./adapters/global');

module.exports = {
    // adapters
    adapters: {
        ext,
        tmpl,
        global,
    },
    // 配置平台不需要的页面
    pageUnsupport: [
        'project.config.json',
    ],
    // 是否支持子包
    isSupportSubpackage: true,
    // 是否能使用wxs
    isCanUseWxs: true,
    // 项目配置文件名
    projectConfig: 'project.config.json',
};
