/**
 * 头条端编译时配置
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
        'sitemap.json',
        'pages/noteCoupon',
        'vipshop/act',
        'vipshop/springFestival',
        'vipshop/noteCoupon',
        'vipshop/gDiamond',
        'vipshop/shop/flashSale',
        'vipshop/shop/themePurchase',
        'vipshop/face',
        'vipshop/fortuneBag',
        'vipshop/nova',
        'vipshop/userEducation',
        'vipshop/groupon'
    ],
    // 是否支持子包
    isSupportSubpackage: true,
    // 是否能使用wxs
    isCanUseWxs: false,
    // 子端标识 getSystemInfo.appName
    client: {
        'baiduboxapp': 'baidu',
        'iqiyi': 'iqiyi',
    },
    // 项目配置文件名
    projectConfig: 'project.swan.json',
};