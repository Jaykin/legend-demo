
var $ = require('jquery');

var TodosModel = require("./scripts/models/todos");
var TodoInputController = require("./scripts/controllers/todo-input-controller");
var TodoInputView = require("./scripts/views/todo-input-view");
var TodosListController = require("./scripts/controllers/todo-list-controller");
var TodosListView = require("./scripts/views/todo-list-view");
var todosModel = new TodosModel();

// 初始化TodoInput组件
function initInput() {
    var todoInputController = new TodoInputController(todosModel)
    var todoInputView = new TodoInputView(todoInputController, todosModel)
  
    todoInputView.build()
    $("#todo-input").html(todoInputView.$el)
}

// 初始化TodoList组件
function initList() {
    var todosListController = new TodosListController(todosModel)
    var todosListView = new TodosListView(todosListController, todosModel)
  
    todosListView.build()
    $("#todos-list").html(todosListView.$el)
}

// 初始化整个应用
!function initTodoApp() {
    initInput();
    initList();
} ();