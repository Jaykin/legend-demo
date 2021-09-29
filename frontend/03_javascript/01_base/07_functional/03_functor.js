/**
 * Functor
 * 
 * - 容器/封装/上下文 Context
 * - Functor（函子）是实现了 map 并遵守一些特定规则的容器类型，是对函数调用的抽象
*/

const compose = (f, g) => x => f(g(a))

class MayBe {
    constructor(x) {
        this.__value = x
    }

    // 创建 factor
    static of(x) {
        return new MayBe(x)
    }

    // 映射新的 factor
    map(fn) {
        return this.isNothing() ? MayBe.of(null) : MayBe.of(fn(this.__value))
    }

    // 判断是否空值
    isNothing() {
        return (this.__value === null) || (this.__value === undefined)
    }
}


// 错误消息 子类 Left、子类 Right
class Left {
    constructor(x) {
        this.__value = x
    }

    static of(x) {
        return new Left(x)
    }

    map(fn) {
        // 用来传递错误消息
        return this
    }
}

class Right {
    constructor(x) {
        this.__value = x
    }

    static of(x) {
        return new Right(x)
    }

    map(fn) {
        return Right.of(fn(this.__value))
    }
}

class IO {
    constructor(fn) {
        this.__value = fn
    }

    static of(x) {
        return new IO(_ => x)
    }

    map(fn) {
        return new IO(compose(fn, this.__value))
    }
}
