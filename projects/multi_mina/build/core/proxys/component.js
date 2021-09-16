const { commonIntercept, noop } = require('./util');

const tmpComponent = Component;

/* ====================== 生命周期拦截 ====================== */
const componentInterceptor = {
    lifetimes: {
        created: [],
        attached: [],
        ready: [],
        moved: [],
        detached: [],
        error: [],
    },
    pageLifetimes: {
        show: [],
        hide: [],
        resize: [],
    }
};

// 添加生命周期拦截函数
function addComponentInterceptor(type, lifetime, handler) {
    componentInterceptor[type] && componentInterceptor[type][lifetime] && componentInterceptor[type][lifetime].push(handler);
}

/* ====================== options 拦截 ====================== */
const componentOptionsInterceptor = [];

function addComponentOptionsInterceptor(handler) {
    typeof handler === 'function' && componentOptionsInterceptor.push(handler);
}

Component = (options = {}) => {
    // 生命周期拦截
    Object.keys(componentInterceptor).forEach(type => {
        const interceptor = componentInterceptor[type];
        const wrapper = type === 'lifetimes' ? (options.lifetimes || options) : (options.pageLifetimes || (options.pageLifetimes = {}));
        Object.keys(interceptor).forEach(lifetime => {
            if (interceptor[lifetime].length) {
                const sourceMethod = wrapper[lifetime] || noop;
                wrapper[lifetime] = commonIntercept(sourceMethod, interceptor[lifetime]);
            }
        });
    });

    // component options 拦截
    componentOptionsInterceptor.forEach((handler) => {
        handler(options);
    });

    return tmpComponent(options);
};

module.exports = {
    addComponentInterceptor,
    addComponentOptionsInterceptor,
};