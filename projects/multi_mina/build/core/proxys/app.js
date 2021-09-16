const {
    isPlainObject,
    commonIntercept,
    merge,
} = require('./util');

const tmpApp = App;

/* ====================== 生命周期拦截 ====================== */
const appInterceptor = {
    onLaunch: [],
    onShow: [],
    onHide: [],
    onError: [],
    onPageNotFound: [],
};

// 添加生命周期拦截函数
function addAppInterceptor(lifetime, handler) {
    appInterceptor[lifetime] && appInterceptor[lifetime].push(handler);
}

/* ====================== 支持 mixin ====================== */
const appMixins = [];

/**
 * @param {object} mixin - 需要混入的对象
 * @param {object} mixin.data - 数据对象
 * @param {object} mixin.methods - 方法对象
 * @returns {undefined}
*/
function addAppMixin(mixin) {
    appMixins.push(mixin);
}

App = (options = {}) => {
    // 生命周期拦截
    Object.keys(appInterceptor).forEach((lifetime) => {
        const sourceMethod = options[lifetime];
        options[lifetime] = commonIntercept(sourceMethod, appInterceptor[lifetime], lifetime);
    });

    // mixin
    if (Array.isArray(options.mixins)) {
        options.mixins.forEach(addAppMixin);
    }

    appMixins.forEach(mixin => {
        if (!isPlainObject(options.globalData)) {
            options.globalData = Object.create(null);
        }

        merge(options.globalData, mixin.data, key => console.warn(`app.globalData.${key} 数据项已被替换`));
        merge(options, mixin.methods, key => console.warn(`app.${key} 方法已被替换`));
    });

    return tmpApp(options);
};

module.exports = {
    addAppInterceptor,
    addAppMixin,
};