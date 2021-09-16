


    /**
     * 模块模式
     *      --全局导入
     *      --全局导出
     * */
    var jquery = require('jquery');

    // 定义Controller超类
    (function ($, exports) {
        var Controller = function () {

        }

        Controller.fn = Controller.prototype;

        Controller.fn.proxy = function (fn) {
            $.proxy(fn, this);
        }

        Controller.fn.load = function (fn) {
            $(this.proxy(fn));
        }

        Controller.fn.include = function (obj) {
            $.extend(this, obj);
        }

        exports.Controller = Controller;
    })(jquery, window);



    // 定义具体controller模块
    (function ($, Controller) {
        var fooController = new Controller();

        fooController.load(function () {
            console.log('DOMContentLoaded!');
        });

        fooController.include({
            tempFunc: function () {
                console.log('fooController.tempFunc be called!');
            }
        });
    })(jquery, Controller);