
/**
 * TodoList控制器类
*/
function TodoListController(model) {
    this.model = model;
}

TodoListController.prototype.onCheck = function (index) {
    var todos = this.model.getTodos(),
        todo = todos[index];

    todo.done = !todo.done;
    this.model.setTodos(todos);
}

module.exports = TodoListController;
