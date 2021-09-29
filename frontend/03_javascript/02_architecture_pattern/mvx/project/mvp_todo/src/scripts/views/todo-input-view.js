
var Handlebars = require("handlebars");
var $ = require('jquery');

function TodoInputView() {
    this.presenter = null;
    this.template = Handlebars.compile($('#todo-input-tpl').html());
    this.$el = null;
}

TodoInputView.prototype.build = function () {
    this.render();
    this.listen();
}

TodoInputView.prototype.render = function () {
    this.$el = $(this.template());
}

TodoInputView.prototype.listen = function () {
    var _this = this;

    this.$el
        .find('.new-todo-btn')
        .on('click', function () {
            _this.presenter.onAddNewTodo();
        });
}

// 设置view的presenter
TodoInputView.prototype.setPresenter = function (presenter) {
    this.presenter = presenter;
}

TodoInputView.prototype.getInput = function () {
    return this.$el.find('input').val();
}

TodoInputView.prototype.setInput = function (value) {
    this.$el.find('input').val(value);
}

module.exports = TodoInputView;