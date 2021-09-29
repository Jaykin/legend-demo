
/**
 * ToDoInput控制器类
*/
function TodoInputController(model) {
    this.model = model;
}

// 添加Todo事项
TodoInputController.prototype.onAddNewTodo = function (content) {
    var todos = this.model.getTodos();

    todos.unshift({ content: content, done: false });
    this.model.setTodos(todos);
}

module.exports = TodoInputController;