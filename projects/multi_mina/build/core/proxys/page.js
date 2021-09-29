const {
    isPlainObject,
    commonIntercept,
    merge,
} = require('./util');

const tmpPage = Page;

/* ====================== 生命周期拦截 ====================== */
const pageInterceptor = {
    onLoad: [],
    onShow: [],
    onReady: [],
    onHide: [],
    onUnload: [],
    onPullDownRefresh: [],
    onReachBottom: [],
    onShareAppMessage: [],
    onPageScroll: [],
    onResize: [],
    onTabItemTap: [],
};

// 添加生命周期拦截函数
function addPageInterceptor(lifetime, handler) {
    pageInterceptor[lifetime] && pageInterceptor[lifetime].push(handler);
}

/* ====================== options 拦截 ====================== */
const pageOptionsInterceptor = [];

function addPageOptionsInterceptor(handler) {
    typeof handler === 'function' && pageOptionsInterceptor.push(handler);
}

/* ====================== 支持 mixin ====================== */
const pageMixins = [];

/**
 * @param {object} mixin - 需要混入的对象
 * @param {object} mixin.data - 数据对象
 * @param {object} mixin.methods - 方法对象
 * @returns {undefined}
*/
function addPageMixin(mixin) {
    pageMixins.push(mixin);
}

Page = (options = {}) => {
    // 生命周期拦截
    Object.keys(pageInterceptor).forEach((lifetime) => {
        const sourceMethod = options[lifetime];
        options[lifetime] = commonIntercept(sourceMethod, pageInterceptor[lifetime], lifetime);
    });

    // options 拦截
    pageOptionsInterceptor.forEach((handler) => {
        handler(options);
    });

    // mixin
    if (Array.isArray(options.mixins)) {
        options.mixins.forEach(pageMixins);
    }

    pageMixins.forEach(mixin => {
        if (!isPlainObject(options.data)) {
            options.data = Object.create(null);
        }

        merge(options.data, mixin.data, key => console.warn(`page.data.${key} 数据项已被替换`));
        merge(options, mixin.methods, key => console.warn(`page.${key} 方法已被替换`));
    });

    return tmpPage(options);
};

module.exports = {
    addPageInterceptor,
    addPageOptionsInterceptor,
    addPageMixin,
};