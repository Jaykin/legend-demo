
function TodoListPresenter(view, model) {
    this.view = view;
    this.model = model;
    this.init();
  }
  
  TodoListPresenter.prototype.init = function() {
    this.view.setPresenter(this);
    this.view.build(this.model.getTodos());
    this.listenModel();
  }
  
  TodoListPresenter.prototype.onCheck = function(index) {
    this.toggleTodoModel(index);
    this.toggleTodoView(index);
  }
  
  TodoListPresenter.prototype.toggleTodoModel = function(index) {
    var todos = this.model.getTodos();
    var todo = todos[index];

    todo.done = !todo.done;
  }
  
  TodoListPresenter.prototype.toggleTodoView = function(index) {
    if (this.model.getTodos()[index].done) {
      this.view.checkItem(index)
    } else {
      this.view.uncheckItem(index)
    }
  }
  
  TodoListPresenter.prototype.listenModel = function() {
    var _this = this;

    this.model.on("change", function() {
      _this.view.render(_this.model.getTodos());
    })
  }
  
  module.exports = TodoListPresenter