// nextTick 支持执行 DOM 更新后的逻辑
// 浏览器任务执行机制：macrotaskA -> microtask -> UI rendering(页面渲染) -> macrotaskB
/**
* microtask
*   promise
*   MutationObserver(监听 DOM 变化)
*   process.nextTick(nodejs)
*   捕获/冒泡事件
* macrotask
*   setTimeout(有最小延时4ms)
*   setInterval
*   setImmediate(nodejs/IE)
*   requestAnimationFrame(回调一般为60次/S，用来保证 60fps，也可能会跟机器的屏幕刷新节奏一致)
*   MessageChannel(开辟信道)
*   postMessage(worker 使用)
*   DOM 事件(click)
*   I/O(read file)
*   UI 渲染(其实是每次 macrotask 之后会执行的任务)
*/

// 是否原生函数，区别业务代码手动定义的函数
function isNative (func) {
    return /native code/.test(func.toString());
}

export const nextTick = (function () {
    const callbacks = [];   // 事件队列
    let pending = false;    // 状态
    let timerFunc;

    function nextTickHandler() {
        pending = false
        const copies = callbacks.slice(0)
        callbacks.length = 0
        for (let i = 0; i < copies.length; i++) {
            copies[i]()
        }
    }

    // 获取延时函数
    if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
        timerFunc = () => {
            setImmediate(nextTickHandler)
        }
    } else if (typeof MessageChannel !== 'undefined' && (
        isNative(MessageChannel) ||
        // PhantomJS
        MessageChannel.toString() === '[object MessageChannelConstructor]'
    )) {
        const channel = new MessageChannel()
        const port = channel.port2
        channel.port1.onmessage = nextTickHandler
        timerFunc = () => {
            port.postMessage(1)
        }
    } else if (typeof Promise !== 'undefined' && isNative(Promise)) {
        const p = Promise.resolve()
        timerFunc = () => {
            p.then(nextTickHandler)
        }
    } else {
        timerFunc = () => {
            setTimeout(nextTickHandler, 0)
        }
    }

    // 支持 cb 方式 & promise 方式
    return function queueNextTick(cb, ctx) {
        let _resolve
        callbacks.push(() => {
            if (cb) {
                try {
                    // 错误处理，避免某个 cb 影响队列中的其他任务
                    cb.call(ctx)
                } catch(err) {
                    console.error(err)
                }
            } else if (_resolve) {
                _resolve(ctx)
            }
        })

        // 若 timerFunc 未启动，则调用下它来启动执行 nextTick 的 cb 队列
        if (!pending) {
            pending = true
            timerFunc()
        }

        if (!cb && typeof Promise !== 'undefined') {
            return new Promise((resolve) => {
                _resolve = resolve
            })
        }
    }
})()