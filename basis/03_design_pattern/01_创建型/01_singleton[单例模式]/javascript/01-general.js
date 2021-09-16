


    /*
    *
    * 一般实现：
    *
    * */

// 01 ---------------------------------------------------------
    var Singleton = function (name) {
        this.name = name;
        //this.instance = null;
    }

    Singleton.prototype.getName = function () {
        return this.name;
    }

        // 这样获取实例的话：
            // 1、还能通过Singleton.instance获取实例
            // 2、通过new Singleton(name)，调用时有问题
    Singleton.getInstance01 = function (name) {
        if (!this.instance) {
            this.instance = new Singleton(name);
        }

        return this.instance;
    }

        // 利用闭包隐藏实例对象
    Singleton.getInstance02 = (function () {
        var instance = null;

        return function (name) {
            if (!instance) {
                instance = new Singleton(name);
            }

            return instance;
        }
    })();

