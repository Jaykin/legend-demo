/**
 * Promise
 */
const PENDING = void 0
const FULFILLED = 1
const REJECTED = 2

class Promise {
    constructor(resolver) {
        /**
         * 等待态 pending
         *      - 可迁移到执行态或拒绝态
         * 执行态 fulfilled
         *      - 不能迁移到其他状态
         *      - 必须拥有一个不可变的终值
         * 拒绝态rejected
         *      - 不能迁移到其他状态
         *      - 必须拥有一个不可变的原因
         */
        this.state = undefined

        // 结果
        this.result = undefined

        //
        this.subscribers = []

        resolver()
    }

    then(onFulfilled, onRejected) {

    }

    catch(onRejected) {
        return this.then(null, onRejected)
    }

    finally(callback) {
        return this.then(callback, callback)
    }
}

Promise.all = all
Promise.race = race
Promise.resolve = Resolve
Promise.reject = Reject

function resolve(promise, value) {
    // value 为 thenable
    if (value instanceof Promise) {

    } else {
        
    }
}

function reject(promise, error) {

}

// 改变 promise 状态到 FULFILLED
function fulfill(promise, value) {
    if (promise.state != PENDING) return 

    promise.state = FULFILLED
    promise.result = value

    if (promise.subscribers.length > 0) {
        asap(publish, promise)
    }
}

// 异步执行
let len = 0
const queue = new Array(1000)
let scheduleFlush

function asap(callback, arg) {
    // callback 推入队列
    queue[len] = callback
    queue[len + 1] = arg
    len += 2

    // 选择异步实现方式
    // if (isNodeJs) scheduleFlush = () => process.nextTick(flush)
    // if (isWorker) scheduleFlush = (function () {
    //     const channel = new MessageChannel();
    //     channel.port1.onmessage = flush;

    //     return () => channel.port2.postMessage(0);
    // })()
    // if (isBrowser && BrowserMutationObserver) scheduleFlush = useMutationObserver()
    if (!scheduleFlush) {
        scheduleFlush = () => setTimeout(flush, 0)
    }

    // 触发 flush
    if (len === 2) {
        scheduleFlush()
    }
}

function flush() {
    for (let i = 0; i < len; i+=2) {
        let callback = queue[i]
        let arg = queue[i + 1]
    
        callback(arg)
    
        queue[i] = undefined
        queue[i + 1] = undefined
    }
    
    len = 0
}

// 发布/订阅
function publish(promise) {

}

function 