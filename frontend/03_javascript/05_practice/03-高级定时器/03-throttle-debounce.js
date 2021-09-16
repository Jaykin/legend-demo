


    /*
    *
    * 函数节流 和 函数去抖
    *
    * */

            // 1.0 函数节流
                // 预先设定一个执行周期，当调用动作的时刻大于等于执行周期则执行该动作，然后进入下一个新周期
    var throttle = function (fn, delay, immediate, debounce) {
        var curr = +new Date(),     //当前时间
            last_call = 0,
            last_exec = 0,
            timer = null,
            diff,                   //时间差
            context,                //上下文
            args,
            exec = function () {
                last_exec = curr;
                fn.apply(context, args);
            };
        return function () {
            curr= +new Date();
            context = this,
                args = arguments,
                diff = curr - (debounce ? last_call : last_exec) - delay;
            clearTimeout(timer);
            if (debounce) {
                if (immediate) {
                    timer = setTimeout(exec, delay);
                } else if (diff >= 0) {
                    exec();
                }
            } else {
                if (diff >= 0) {
                    exec();
                } else if (immediate) {
                    timer = setTimeout(exec, -diff);
                }
            }
            last_call = curr;
        }
    };


            // 2.0 函数去抖
                // 当调用动作n毫秒后，才会执行该动作，若在n毫秒内又调用此动作则将重新计算执行时间
    var debounce = function (fn, delay, immediate) {
        return throttle(fn, delay, immediate, true);
    };


    function throttle(fn, delay) {
        var args, context;
        var curr = 0;
        var lastCall = 0;   // 函数最近一次被调用的时间点
        var diff = 0;       // 两次被调用的时间间隔
        var timer = null;
        var exec = function () {
            fn.apply(context, args);
        }
        return function () {
            // 做过节流处理的函数（类似柯里化）
            clearTimeout(timer);
            curr = +new Date();     // 函数当前被调用的时间点
            diff = curr - lastCall;
            if (diff > delay) {
                exec();
            } else {
                timer = setTimeout(exec, 0);
            }
            lastCall = curr;
        }
    }

