
/*
*
* 应用总结
*
* */


// 1.0 模仿块级作用域

(function () {
        // 构成块级作用域
    var now = new Date();
    if (now.getMonth() == 0 && now.getDate() == 1){
        alert("Happy new year!");
    }
})();
console.log(now);       // 访问出错


// 2.0、私有变量和特权方法

    // 2.0.1 构造函数中定义特权方法
function Person(initName) {
        // 私有成员：私有变量 和 私有方法
    var name = initName;
    function showName() {
        console.log(name);
    }

        // 特权方法
    this.setName = function (value) {
        name = value;
    }
    this.getName = function () {
        showName();
        return name;
    }
}

    // 2.0.2 原型中定义特权方法
(function (global) {
        // 私有成员
    var name = '';
    var showName = function () {
        console.log(name);
    }

    global.Person = function (initName) {
        name = initName;
    }

        // 特权方法
    global.Person.prototype.setName = function (value) {
        name = value;
    }

    global.Person.prototype.getName = function () {
        showName();
        return name;
    }
})(window);


    // 2.0.3 模块模式
var singleton = function (initName) {
        // 私有成员
    var name = initName;
    function showName() {
        console.log(name);
    }

        // 公共
    return {
        setName: function (value) {
            name = value;
        },
        getName: function () {
            showName();
            return name;
        }
    }
}();

    // 2.0.4 增强的模块模式
var MyApp = function () {
    this.version = '1.0.0';
}
var singletonStronger = function (initName) {
    var name = initName;
    function showName() {
        console.log(name);
    }

    var app = new MyApp();

    app.getName = function () {
        showName();
        return name;
    }
    app.setName = function (value) {
        name = value;
    }

    return app;
}

