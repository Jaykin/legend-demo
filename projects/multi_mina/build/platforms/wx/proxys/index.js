// 平台 api 代理（注意：需要保证在各端环境下运行正常）
const proxys = require('../../../core/proxys/api');

function apiProxy(ctx) {
    return {
        testFunc: proxys.testFunc
    };
}

module.exports = {
    apiProxy,
};