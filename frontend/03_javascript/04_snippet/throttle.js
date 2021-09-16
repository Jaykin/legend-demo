/**
 * 节流函数（限制过了一定时间才进行一次函数调用）
 * 
 * 预先设定一个执行周期，当调用动作的时刻大于等于执行周期则执行该动作，然后进入下一个新周期
 */

// 01 - 简单版
function throttle001(func, wait) {
    var lastTime = 0
    return function () {
        var nowTime = Date.now(),
            context = this,
            args = arguments;

        if (!lastTime || nowTime - lastTime >= wait) {
            func.apply(context, args);
            lastTime = nowTime;
        }
    }
}

/**
 * @param {number} wait 在 wait 秒内最多执行 func 一次的函数
 */
function throttle(func, wait, options) {
    let leading = 'leading' in options ? !!options.leading : true
    let trailing = 'trailing' in options ? !!options.trailing : true
    
    return debounce(func, wait, {
        leading,
        trailing,
        maxWait: wait
    })
}