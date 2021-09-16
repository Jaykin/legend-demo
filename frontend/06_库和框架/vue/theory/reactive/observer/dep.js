/**
 * 依赖类
 */
let uid = 0

class Dep {
    constructor() {
        this.id = uid++
        this.subs = []
    }

    depend() {

    }

    notify() {
        
    }
}