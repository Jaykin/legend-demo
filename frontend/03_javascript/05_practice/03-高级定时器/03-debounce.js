
/**
 * 函数去抖：在调用动作N毫秒后，才会执行该动作，若在N毫秒内又调起此动作则将重新计算时间
 * @param {Function} func -- 需要进行去抖处理的函数
 * @param {Number} wait -- 设置的时间间隔
 * @param {Object} options -- 配置项
*/

// 01 - 简单版
function debounce001(func, wait, options) {
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
 * 02 - 完善版实现
 * options.leading {Boolean}
 *      true表示首次调用时立即调用func
 *      false表示首次调用时延迟wait再调用func
 * options.trailing {Boolean} 
 * options.maxWait {Number} 最大的延迟时间
 */
function debounce002(func, wait, options) {
    var lastTime = 0
        nowTime = 0,
        leading = options.leading,
        trailing = options.trailing,
        timer = null,
        result = null;

    function now() {
        return Date.now()
    }

    function laterInvokeFunc(context, args) {
        var remaining = now() - nowTime;

        if (remaining >= 0 && remaining < wait) {
            timer = setTimeout(function () {
                laterInvokeFunc(context, args)
            }, wait - remiaining)
        } else {
            timer = null;
            result = func.apply(context, args);
        }
    }

    return function () {
        var context = this,
            args = arguments;

        nowTime = now();    

        if (leading && !timer) {
            func.apply(context, args)
        }

        if (!timer) timer = setTimeout(function () {
            laterInvokeFunc(context, args)
        }, wait)

        return result;  
    }
}