const Dep = require('./dep');
const { parsePath, traverse } = require('./helpers/utils');

class Watcher {
    constructor(
        vm,
        exp,
        cb,
        options
    ) {
        this.vm = vm;
        this.cb = cb;
        this.getter = parsePath(exp);
        this.value = this.get();
    }

    // 将实例注入到相应响应式属性的依赖中去，并获取响应式属性的值
    get() {
        Dep.target = this;
        // 通过触发getter来收集watcher
        const value = this.getter(this.vm);
        Dep.target = undefined;
        return value;
    }

    // 接收数据更新的通知
    update() {
        const oldVal = this.value;
        this.value = this.getter(this.vm);
        this.cb && this.cb(this.value, oldVal);
    }

    // 将watcher添加到dep
    addDep(dep) {
        dep.addSub(this);
    }

    // 清除watcher
    teardown() {
        
    }
}

module.exports = Watcher;
