


    /*
    *
    * 缓存代理：计算结果
    *
    *
    * */


    var mult = function () {
        var args = arguments;
        var ret = 1;
        console.log(new Date, '开始计算乘积');

        for (var i = 0, len = args.length; i < len; i++) {
            ret *= args[i];
        }

        return ret;
    }

        /*
        * 1、通过比较前后传入的参数是否一致来决定是否使用缓存
        * 2、如果是复杂数据类型，那怎么比较前后参数呢？（没想到什么好方法）
        *
        * */
    var proxyCacheMult = (function () {
        var cache = {};

        return function () {
            var args = Array.prototype.join.call(arguments, '-');

            if (args in cache) {
                console.log('使用缓存结果');
                return cache[args];
            }

            return cache[args] = mult.apply(this, arguments);
        }
    })();


    console.log(proxyCacheMult(2, 10, 599));
    console.log(proxyCacheMult(2, 10, 599));

    