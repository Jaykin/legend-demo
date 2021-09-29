/** 
 * @file 异步操作过程中在相应时间点执行其他操作
 * @author wangkj
*/

/**在异步的执行过程中，基于该执行过程的时间点来执行其他操作
 * options.iterval : 时间间隔精度，默认为1000ms
 * @returns {Promise}
 * @example
 * timeouter(promise, [{
 *      time: 2000,         // 时间点
 *      action: res => {}   // 具体时间点需要执行的操作
 * }]);
 * 
 * res.time：时间点
 * res.idx：时间点的索引
*/
function timeouter(promise, times, options) {
    const len = times.length;
    const INTERVAL = options && options.interval || 1000;

    if (!len) return promise;

    const sTime = +new Date;
    let remaining, 
        lastTime = times[len - 1],
        idx, time;
    let timer = setInterval(() => {
        remaining = +new Date - sTime;

        for (idx = 0; idx < len; idx++) {
            time = times[idx];

            if (
                idx < len - 1 &&
                remaining >= time.time && 
                remaining < times[idx + 1].time
            ) {
                time.action({ time, idx });
                break;
            }

            if (remaining >= lastTime.time || remaining < 0) {
                lastTime.action({ time, idx });
                clearInterval(timer);
                timer = null;
                break;
            }
        }
    }, INTERVAL);

    return promise.then(res => {
        timer && clearInterval(timer);
        return res;
    }).catch(e => {
        timer && clearInterval(timer);
        return Promise.reject(e);
    })
}

export default timeouter