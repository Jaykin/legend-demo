var $ = require('jquery');
var Handlebars = require("handlebars");

function TodoListView(model) {
  this.presenter = null;
  this.model = model;
  this.template = Handlebars.compile($("#todo-list-tpl").html());
  this.$el = $("<div></div>");
}

TodoListView.prototype.build = function(todos) {
  this.render(todos);
  this.listen();
}

TodoListView.prototype.render = function(todos) {
  this.$el.html(this.template({todos: todos}));
}

TodoListView.prototype.setPresenter = function(presenter) {
  this.presenter = presenter;
}

TodoListView.prototype.listen = function() {
  var _this = this;

  _this.$el.on("click", "li", null, function(event) {
    var $li = $(event.currentTarget);

    _this.presenter.onCheck(+$li.attr("data-index"));
  })
}

TodoListView.prototype.checkItem = function(i) {
  return this.$el.find("li").eq(i).addClass("done");
}

TodoListView.prototype.uncheckItem = function(i) {
  return this.$el.find("li").eq(i).removeClass("done");
}

module.exports = TodoListView;