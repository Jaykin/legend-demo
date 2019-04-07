
const arrayProto = Array.prototype;
const arrayMethods = Object.create(arrayProto);

// 需要拦截的数组方法
const methodsToPatch = [
    'push',
    'pop',
    'shift',
    'unshift',
    'splice',
    'sort',
    'reverse'
];

methodsToPatch.forEach((method) => {
    const original = arrayProto[method];

    // 不能直接修改 Array.prototype因为这样会污染全局的Array,希望只对 data中的Array 生效
    // arrayProto[method] = function (...args) {
    arrayMethods[method] = function (...args) {
        const result = original.apply(this, args);
        const ob = this.__ob__;
        let inserted;

        switch (method) {
            case 'push':
            case 'unshift':
                inserted = args;
                break
            case 'splice':
                inserted = args.slice(2);
                break
        }

        if (inserted) ob.observeArray(inserted);
        console.log("数组变了");
        ob.dep.notify();
        return result;
    }
});

module.exports = {
    arrayMethods
}