var $ = require('jquery');

var TodosModel = require("./scripts/models/todos");

var TodoInputPresenter = require("./scripts/presenters/todo-input-presenter");
var TodoInputView = require("./scripts/views/todo-input-view");

var TodoListPresenter = require("./scripts/presenters/todo-list-presenter");
var TodoListView = require("./scripts/views/todo-list-view");

var todoModel = new TodosModel();

function initTodoApp() {
  initInput()
  initList()
}

function initInput() {
  var todoInputView = new TodoInputView();
  var todoInputPresenter = new TodoInputPresenter(todoInputView, todoModel);

  $("#todo-input").html(todoInputView.$el);
}

function initList() {
  var todoListView = new TodoListView();
  var todoListPresenter = new TodoListPresenter(todoListView, todoModel);

  $("#todo-list").html(todoListView.$el);
}

initTodoApp()