
var EventEmitter = require("eventemitter2").EventEmitter2;

function TodosModel() {
    EventEmitter.call(this);
    this._todos = [{
        content: 'Make Money',
        done: false
    }]
}

TodosModel.prototype = Object.create(EventEmitter.prototype);

TodosModel.prototype.constructor = TodosModel;

TodosModel.prototype.getTodos = function () {
    return this._todos;
}

TodosModel.prototype.setTodos = function (todos) {
    this._todos = todos;
    this.emit('change', todos);
}

module.exports = TodosModel;