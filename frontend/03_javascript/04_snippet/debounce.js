/**
 * 防抖函数 TODO
 * 
 * 当调用动作n毫秒后，才会执行该动作，若在n毫秒内又调用此动作则将重新计算执行时间
 */


// 01 - 简单版
function debounce001(func, wait) {
    var lastTimer = null;

    return function () {
        var context = this,
            args = arguments;
        
        clearTimeout(lastTimer);
        lastTimer = setTimeout(function () {
            func.apply(context, args)
        }, wait);
    }
}

/**
 * 函数会从上一次被调用后，延迟 wait 毫秒后执行 func
 * @param {number} [wait=0] 延迟毫秒数
 * @param {Object} [options={}]
 * @param {boolean} [options.leading=false] true 代表先调用后等待
 * @param {boolean} [options.trailing=true] true 代表先等待后调用
 * @param {number} [options.maxWait] `func` 被执行前的最大等待时间
*/
function debounce(func, wait = 0, options = {}) {
    let lastArgs,
        lastThis,
        lastCallTime,
        timerId, // 定时器
        result   // func 的 return

    let lastInvokeTime = 0
    let maxing = 'maxWait' in options
    let maxWait = maxing ? Math.max(+options.maxWait || 0, wait) : undefined

    // 当前调用时间点是否可执行 func
    function shouldInvoke(time) {
        const timeSinceLastCall = time - lastCallTime
        const timeSinceLastInvoke = time - lastInvokeTime

        return lastCallTime === undefined ||    // 首次调用
            timeSinceLastCall >= wait ||        // 调用间隔大于指定时间
            timeSinceLastCall < 0 ||
            (maxing && timeSinceLastInvoke >= maxWait)
    }

    // 执行 func
    function invokeFunc(time) {
        const that = lastThis
        const args = lastArgs

        lastThis = lastArgs = undefined
        lastInvokeTime = time
        result = func.apply(that, args)

        return result
    }

    function leadingEdge(time) {
        lastInvokeTime = time
        timerId = setTimeout(timerExpired, wait)
        // 先调用后等待
        return leading ? invokeFunc(time) : result
    }
    
    function debounced(...args) {
        const time = Date.now()
        const isInvoking = shouldInvoke(time)

        lastArgs = args
        lastThis = this
        lastCallTime = time

        if (isInvoking) {
            if (timerId === undefined) {
                return leadingEdge(lastCallTime)
            }
        }

        if (timerId === undefined) {
            timerId = setTimeout(timerExpired, wait)
        }

        return result
    }

    // TODO
    debounced.cancel = function () {}
    debounced.flush = function () {}
    debounced.pending = function () {}

    return debounced
}