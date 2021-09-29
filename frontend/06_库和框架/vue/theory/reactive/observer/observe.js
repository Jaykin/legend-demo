import Dep from './Dep'

/**
 * 观察者类
 */
class Observer {
    target = null; // 被观察对象
    dep = null; // 依赖对象 Dep

    constructor(target) {
        this.target = target
        this.dep = new Dep()

        // 添加 target 的观察者引用，并限制枚举
        Object.defineProperty(value, '__ob__', {
            value: this,
            enumerable: false
        });

        if (Array.isArray(target)) {
            this.observeArray(target)
        } else {
            this.observeObject(target)
        }
    }

    observeObject(obj) {

    }

    observeArray(array) {

    }
}

/**
 * 绑定 value 和 Observer，用来观察 value
 * @param {Object | Array} target - 需要观察的数据对象
 * @returns {Observer | void} .
 */
function observe(target) {
    // value 需要是对象类型
    if (target == null || typeof target !== 'object') {
        return
    }

    let ob = null
    if (target.hasOwnProperty('__ob__')) {
        ob = target.__ob__
    } else if (
        (Array.isArray(target) || Object.prototype.toString.call(target) === '[object Object]') && // 仅支持数组 or 普通对象
        Object.isExtensible(target) // 对象可扩展
    ) {
        ob = new Observer(target);
    }

    return ob;
}

/**
 * 
 */
function defineReactive() {
    
}