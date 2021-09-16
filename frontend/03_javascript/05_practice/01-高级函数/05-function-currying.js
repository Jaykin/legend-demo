


    /*
    *
    * 函数柯里化
    *
    * */

    function currying(fn) {
        var args = Array.prototype.slice.call(arguments, 1);
        var self = this;
        return function () {
            var innerArgs = Array.prototype.slice.call(arguments);
            var finalArgs = args.concat(innerArgs);
            return self.apply(null, finalArgs);
        }
    }

    function add(num1, num2) {
        return num1 + num2;
    }

    var curriedAdd = currying(add, 5);
    console.log(curriedAdd(2, 5));      // 7



    /*
    *
    * 反柯里化
    * */

