
/**解析URL*/
export function parseUrl(url) {
    let obj = {};
    let keyvalue = [];
    let key = "", value = "";
    let paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");

    for (const i in paraString) {
        keyvalue = paraString[i].split("=");
        key = keyvalue[0];
        value = keyvalue[1];
        obj[key] = value;
    }

    return obj;
};

/**
 * 将参数对象转换为query字符串
 * @param  {object} queryObj query对象
 * @return {string}          拼接好的query字符串
 */
export function serialize(queryObj) {
    if (!queryObj) {
        throw new Error('url.serialize方法必须传入参数，请检查');
    } else if (typeof queryObj !== 'object' || Array.isArray(queryObj)) {
        throw new Error('参数queryObj必须为对象，请检查');
    }

    var queryArr = [];
    var queryStr = '?';

    for (var key in queryObj) {
        if ({}.hasOwnProperty.call(queryObj, key)) {
            var queryPair = key + '=' + queryObj[key];
            queryArr.push(queryPair);
        }
    }

    queryStr += queryArr.join('&');

    return queryStr;
};



/**函数去抖, 用法同lodash*/
var _ = require('../assets/plugin/lodash'),
    now = Date.now(),
    FUNC_ERROR_TEXT = 'Expected a function',
    nativeMax = Math.max,
    nativeMin = Math.min;

export function debounce(func, wait, options) {
    var lastArgs,
        lastThis,
        maxWait,
        result,
        timerId,
        lastCallTime,
        lastInvokeTime = 0,
        leading = false,
        maxing = false,
        trailing = true;

    if (typeof func != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
    }
    wait = +wait || 0;
    if (_.isObject(options)) {
        leading = !!options.leading;
        maxing = 'maxWait' in options;
        maxWait = maxing ? nativeMax(+options.maxWait || 0, wait) : maxWait;
        trailing = 'trailing' in options ? !!options.trailing : trailing;
    }

    function invokeFunc(time) {
        var args = lastArgs,
            thisArg = lastThis;

        lastArgs = lastThis = undefined;
        lastInvokeTime = time;
        result = func.apply(thisArg, args);
        return result;
    }

    function leadingEdge(time) {
        // Reset any `maxWait` timer.
        lastInvokeTime = time;
        // Start the timer for the trailing edge.
        timerId = setTimeout(timerExpired, wait);
        // Invoke the leading edge.
        return leading ? invokeFunc(time) : result;
    }

    function remainingWait(time) {
        var timeSinceLastCall = time - lastCallTime,
            timeSinceLastInvoke = time - lastInvokeTime,
            result = wait - timeSinceLastCall;

        return maxing ? nativeMin(result, maxWait - timeSinceLastInvoke) : result;
    }

    function shouldInvoke(time) {
        var timeSinceLastCall = time - lastCallTime,
            timeSinceLastInvoke = time - lastInvokeTime;

        // Either this is the first call, activity has stopped and we're at the
        // trailing edge, the system time has gone backwards and we're treating
        // it as the trailing edge, or we've hit the `maxWait` limit.
        return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
            (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
    }

    function timerExpired() {
        var time = now;
        if (shouldInvoke(time)) {
            return trailingEdge(time);
        }
        // Restart the timer.
        timerId = setTimeout(timerExpired, remainingWait(time));
    }

    function trailingEdge(time) {
        timerId = undefined;

        // Only invoke if we have `lastArgs` which means `func` has been
        // debounced at least once.
        if (trailing && lastArgs) {
            return invokeFunc(time);
        }
        lastArgs = lastThis = undefined;
        return result;
    }

    function cancel() {
        if (timerId !== undefined) {
            clearTimeout(timerId);
        }
        lastInvokeTime = 0;
        lastArgs = lastCallTime = lastThis = timerId = undefined;
    }

    function flush() {
        return timerId === undefined ? result : trailingEdge(now);
    }

    function debounced() {
        var time = now,
            isInvoking = shouldInvoke(time);

        lastArgs = arguments;
        lastThis = this;
        lastCallTime = time;

        if (isInvoking) {
            if (timerId === undefined) {
                return leadingEdge(lastCallTime);
            }
            if (maxing) {
                // Handle invocations in a tight loop.
                timerId = setTimeout(timerExpired, wait);
                return invokeFunc(lastCallTime);
            }
        }
        if (timerId === undefined) {
            timerId = setTimeout(timerExpired, wait);
        }
        return result;
    }

    debounced.cancel = cancel;
    debounced.flush = flush;

    return debounced;
}


/**
 * 将数组分块
 * @param {Array} 需要做处理的数组
 * @param {Number} 每个chunk的长度
 * @param {Number} chunk的个数
 * @returns {Array} 返回由chunks组成的新数组
 * @example
 * chunk(['a', 'b', 'c', 'd', 'e'], 2);
 * // => [['a', 'b'], ['c', 'd'], ['e']]
 *
 * chunk(['a', 'b', 'c', 'd', 'e'], 2, 2);
 * // => [['a', 'b'], ['c', 'd']]
*/
export function chunk(array, size, count) {
    if (size === undefined) size = 1;

    const length = array.length || 0;

    if (!length || size < 1) return [];

    let index = 0,
        resIndex = 0,
        chunkNum = count || Math.ceil(length / size),
        result = Array(chunkNum);

    while (index < length && resIndex < chunkNum) {
        result[resIndex++] = array.slice(index, (index += size));
    }

    return result;
}


/**
 * rpx转为px
*/
export function rpxTOpx(rpx) {
    const sys = wx.getSystemInfoSync();
    const screenWidth = sys.screenWidth || sys.windowWidth;

    return Math.ceil(rpx * screenWidth / 750)
}

/**
 * px转为rpx
*/
export function pxTOrpx(px) {
    const sys = wx.getSystemInfoSync();
    const screenWidth = sys.screenWidth || sys.windowWidth;

    return Math.ceil(px * 750 / screenWidth);
}
