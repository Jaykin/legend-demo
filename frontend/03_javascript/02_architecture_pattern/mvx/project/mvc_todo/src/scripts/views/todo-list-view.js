
var Handlebars  = require('handlebars');    // 引入模板引擎
var $ = require('jquery');

/**
 * TodoList视图类
*/
function TodoListView(controller, model) {
    this.controller = controller;
    this.model = model;
    this.template = Handlebars.compile($('#todo-list-tpl').html());
    this.$el = $('<div></div>');
}

TodoListView.prototype.build = function () {
    this.render();
    this.listenDOM();
    this.listenModel();
}

TodoListView.prototype.render = function () {
    var todos = this.model.getTodos();

    this.$el.html(this.template({ todos: todos }));
}

TodoListView.prototype.listenDOM = function () {
    var _this = this;

    this.$el.on('click', 'li', function (e) {
        var $li = $(e.currentTarget);

        _this.controller.onCheck(+$li.attr('data-index'));
    })
}

TodoListView.prototype.listenModel = function () {
    this.model.on('change', this.render.bind(this));
}

module.exports = TodoListView;