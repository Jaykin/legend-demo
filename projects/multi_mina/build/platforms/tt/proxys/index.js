// 平台 api 代理（注意：需要保证在各端环境下运行正常）
const apis = require('./api');
const { addAppInterceptor, addAppMixin } = require('../../../core/proxys/app');
const { addPageInterceptor, addPageOptionsInterceptor, addPageMixin } = require('../../../core/proxys/page');
const { addComponentInterceptor, addComponentOptionsInterceptor } = require('../../../core/proxys/component');

const noop = () => {};
const namespace = 'nb';

/**
 * selectComponent/selectAllComponents 的兼容
 * page onReady 后才能以同步方式使用，之前为异步方法
 * 头条组件与页面的生命周期为：
 *     page onload、page onshow、component created、component attached、component ready、page onready
 * 微信组件与页面的生命周期为：
 *     component created、component attached、page onload、page onshow、component ready、page onready
 * @returns {undefined}
 */
function compatibleForSelectComponent() {
    const isReadyFlag = `__${namespace}_isReady__`;
    // 页面
    addPageOptionsInterceptor(function (pageObj) {
        let onLoad = pageObj.onLoad || noop;
        let onShow = pageObj.onShow || noop;
        let onReady = pageObj.onReady || noop;
        let pageLoadArgs = null;

        pageObj['onLoad'] = function () {
            pageLoadArgs = arguments;
        };
        pageObj['onShow'] = function () {
            if (this[isReadyFlag]) {
                onShow.call(this);
            }
        };
        pageObj['onReady'] = function () {
            onLoad.apply(this, pageLoadArgs);
            onShow.call(this);
            onReady.call(this);
            this[isReadyFlag] = true;  // 标记是否已经ready
        };
    });

    /**
     * 组件暂不需要处理
     * 微信：ready 时组件实例调用 selectComponent 成功
     * 头条：attached/ready 时组件实例调用 selectComponent 成功
    */
}
compatibleForSelectComponent();

module.exports = {
    // api 代理
    apiProxy: apis,
    // app
    addAppInterceptor,
    addAppMixin,
    // page
    addPageInterceptor,
    addPageOptionsInterceptor,
    addPageMixin,
    // component
    addComponentInterceptor,
    addComponentOptionsInterceptor,
};