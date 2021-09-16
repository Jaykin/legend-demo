

    /*
    *
    * 函数绑定
    *
    * */

    // 1.0 事件触发时this动态绑定的问题
    var handler = {
        message: "Event handled",
        handleClick: function(event){
            alert(this.message);
        }
    };

    var btn = document.getElementById("my-btn");
    addEventListener(btn, 'click', handler.handleClick);        // undefined


    // 解决方案01：闭包
    addEventListener(btn, 'click', function (event) {
        handler.handleClick(event);                             // 'Event handled'
    });


    // 解决方案02： bind()
    function bind(fn, context) {
        return function () {
            return fn.apply(context, arguments);
        }
    }
    addEventListener(btn, 'click', bind(handler.handleClick, handler));     // 'Event handled'
    addEventListener(btn, 'click', handler.handleClick.bind(handler));     // 'Event handled'


    // 2.0、自定义bind()函数
            // 2.0.1 简单版（将this绑定给对象）
    Function.prototype.bind = function (context) {
        var self = this;
        return function () {
            return self.apply(context, arguments);
        }
    }
    (function (){}).bind(null)(1, 2, 3);

            // 2.0.2 柯里化（将this绑定给对象时并能传递参数）
    Function.prototype.bind = function (context) {
        var self = this;
        var args = Array.prototype.slice.call(arguments, 1);
        return function () {
            var innerArgs = Array.prototype.slice.call(arguments, 1);
            var finalArgs = args.concat(innerArgs);
            return self.apply(context, finalArgs);
        }
    }
    (function (){}).bind(null, 1, 2)(3, 4);

            // 2.0.3 绑定后的函数被当做构造函数调用时
            // 两个问题：实例的this指向不是实例，实例并不是原函数的实例（instanceof为false）
    Function.prototype.bind = function (context) {
        var self = this;
        var args = Array.prototype.slice.call(arguments, 1);
        var F = function () {};
        var bound = function () {
            var innerArgs = Array.prototype.slice.call(arguments, 1);
            var finalArgs = args.concat(innerArgs);
            return self.apply(this instanceof F ? this : context, finalArgs);
        }
        F.prototype = self.prototype;
        bound.prototype = new F();
        bound.prototype.constructor = bound;
        return bound;
    }
    new (function (){}).bind(null, 1, 2)(3, 4);