/**
 * Created by Administrator on 2017/1/10.
 */
/*
* 发布/订阅模式：定义一种一对多的依赖关系，当一个对象的状态发生改变时，所有依赖于它的对象都将得到通知
*
* */

var salesOffices = {};

salesOffices.clientList = {};

salesOffices.listen = function (key, fn) {
    if (!this.clientList[key]) {
        this.clientList[key] = [];
    }
    this.clientList[key].push(fn);
}

salesOffices.trigger = function (key, data) {
    var handlers = this.clientList[key];
    if (!handlers || handlers.length === 0) {
        return false;
    }
    for (var i = 0, fn; fn = handlers[i++]; ) {
        fn.call(this, data);
    }
}

