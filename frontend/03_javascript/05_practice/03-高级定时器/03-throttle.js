

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


// 02 - 完善版实现
/**options主要是用来处理头尾操作的
 * 
 * options.leading {Boolean}
 * 注：true表示首次调用返回值方法时，会马上调用func
 *     false表示仅会记录当前时刻，当第二次调用的时间间隔超过wait时，才调用func
 * options.trailing {Boolean}
 * 注：true表示当调用返回值方法时，未达到wait指定的时间间隔，则启动计时器延迟调用func函数，
 *         若后续在既未达到wait指定的时间间隔和func函数又被调用的情况下调用返回值方法，则被调用请求将被丢弃
 *     false表示丢弃未在指定时间间隔点的调用请求 
*/
function throttle002(func, wait, options) {
    if (!options) options = {};

    var lastTime = 0
        timer = null,
        leading = options.leading || false,
        trailing = options.trailing || false,
        result = null;

    // 获取当前时间    
    function now() {
        return Date.now()
    }

    // 调用func
    function invokeFunc(context, args) {
        // 调用func
        result = func.apply(context, args);
        
        // 重置上一次调用时间
        lastTime = now();

        timer = null;
    }    

    return function () {
        var nowTime = now(),
            context = this,
            args = arguments,
            remaining;                  

        // leading为false时
        if (!lastTime && !leading) lastTime = nowTime;

        // 计算剩余时间
        remaining = wait - (nowTime - lastTime);

        // 当到达间隔点 或者 客户端修改了系统时间导致nowTime < lastTime时，直接调用func
        if (remaining <= 0 || remaining > wait) {
            // 如果到达wait时间间隔点后，上一次操作还未执行时，则先清除上一次的操作
            timer && clearTimeout(timer);

            // 调用func
            invokeFunc(context, args);            
        } else if (!timer && trailing) {
            // 未到时间间隔点 并且 trailing为true时，延迟执行func
            timer = setTimeout(function () {
                invokeFunc(context, args)
            }, remaining)
        }

        return result;
    }
}