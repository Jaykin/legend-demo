
var EventEmitter = require('eventemitter2').EventEmitter2;
/**
 * TodoList的模型类
 * 利用观察者模式来与view通信（继承eventemitter库的类）
*/

function TodosModel() {
    EventEmitter.call(this);

    this.todos = [{
        content: 'Make Money',
        done: false
    }]
}

TodosModel.prototype = Object.create(EventEmitter.prototype);

TodosModel.prototype.constructor = TodosModel;

TodosModel.prototype.getTodos = function () {
    return this.todos;
};

TodosModel.prototype.setTodos = function (todos) {
    this.todos = todos;

    // 派发todos数据已更新的事件
    this.emit('change', todos);
};

module.exports = TodosModel;