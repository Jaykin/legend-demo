
var Handlebars  = require('handlebars');    // 引入模板引擎
var $ = require('jquery');

/**
 * TodoInput视图类
*/
function TodoInputView(controller, model) {
    this.controller = controller;
    this.model = model;
    this.template = Handlebars.compile($("#todo-input-tpl").html());
    this.$el = $('<div></div>');
}

// 初始化视图
TodoInputView.prototype.build = function () {
    this.render();
    this.listen();
}

// 渲染视图
TodoInputView.prototype.render = function () {
    this.$el.html(this.template());
}

// 监听事件
TodoInputView.prototype.listen = function () {
    var _this = this;

    // 监听DOM事件
    this.$el
        .find('.new-todo-btn')
        .on('click', function () {
            var $input = _this.$el.find('.input-todo'),
                content = $input.val();
            
            if (!content) return;

            $input.val('');
            
            // 通知控制器更新数据
            _this.controller.onAddNewTodo(content);
        })
}

module.exports = TodoInputView;