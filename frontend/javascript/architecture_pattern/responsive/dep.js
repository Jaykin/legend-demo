const { remove } = require("./helpers/utils");

class Dep {
    constructor() {
        this.subs = [];     // 监听者列表
    }

    // 添加监听器
    addSub(sub) {   
        this.subs.push(sub);
    }

    // 移除监听器
    removeSub(sub) {
        remove(this.subs, sub);
    }

    // 添加依赖
    depend () {
        if (Dep.target) {
            // Dep.target.addDep(this);
            this.addSub(Dep.target);
        }
      }

    // 遍历通知所有监听器更新
    notify() {
        const subs = this.subs.slice();
        for (let i = 0, l = subs.length; i < l; i++) {
            subs[i].update();
        }
    }
}

Dep.target = null    // 实时的监听器实例

module.exports = Dep;