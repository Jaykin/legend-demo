


    // 实现发布/订阅模式

    var pubsub = (function () {
        var _callbacks = {};

        var pb = function (_callbacks) {
            return {
                // 监听
                listen: function (event, callback) {
                    _callbacks[event] || (_callbacks[event] = []).push(callback);

                    return this;
                },

                // 触发
                trigger: function (event) {
                    var list, fn, i, args;

                    if (!(list = _callbacks[event])) return this;

                    args = Array.prototype.slice.call(arguments, 1);

                    for (i = 0; fn = list[i++];) {
                        fn.apply(this, args);
                    }

                    return this;
                },

                // 取消监听
                remove: function (event, callback) {
                    var list, i, fn;

                    if (!(list = _callbacks[event])) return this;

                    for (i = 0; fn = list[i++];) {
                        fn === callback && list.splice(i, 1);
                    }

                    return this;
                },

                // 创建新的pubsub
                create: function () {
                    var _callbacks = {};

                    return pb(_callbacks);
                }
            }
        }

        return pb(_callbacks);
    })();


// 使用类

    var Event = function () {
        this.listeners = {};
    }

    Event.fn = Event.prototype;

    Event.fn.listen = function (event, callback) {
        var listeners = this.listeners;
        listeners[event] || (listeners[event] = []).push(callback);
        return this;
    }
    Event.fn.trigger = function (event) {
        var listeners = this.listeners,
            list, fn, i, args;

        if (!(list = listeners[event])) return this;

        args = Array.prototype.slice.call(arguments, 1);

        for (i = 0; fn = list[i++];) {
            fn.apply(this, args);
        }

        return this;
    }
    Event.fn.remove = function (event, func) {
        var listeners = this.listeners,
            list, i, fn;

        if (!(list = listeners[event])) return this;

        for (i = 0; fn = list[i++];) {
            fn === func && list.splice(i, 1);
        }

        return this;


    }