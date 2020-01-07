import { computed, decorate, observable, action } from "mobx";
import TodoService from "../services/firebase";

class Todo {
  constructor(rootStore) {
    this.userStore = rootStore.userStore;
    this.todos = [];
    this.isFetching = true;
    this.searchQuery = "";
  }

  get todoList() {
    return this.searchQuery ? this.searchTodos(this.todos) : this.todos;
  }

  get incompletedTodos() {
    return this.todoList.filter(task => !task.isDone);
  }

  get completedTodos() {
    return this.todoList.filter(task => task.isDone);
  }

  fetchTodos() {
    if (this.userStore.user) {
      this.isFetching = true;
      TodoService.getUsersTodos(this.userStore.user.uid).then(todos => {
        this.todos = todos;
        this.isFetching = false;
      });
    }
  }

  createTodo(todo) {
    return TodoService.addTodo(todo).then(newTodo => {
      newTodo.get().then(data => {
        this.todos = [{ id: data.id, ...data.data() }, ...this.todos];
      });
      return newTodo;
    });
  }

  markAsDone(id) {
    return TodoService.markAsDone(id).then(resp => {
      const todoIndex = this.todos.findIndex(todo => todo.id === id);
      this.todos[todoIndex].isDone = true;
    });
  }

  deleteTodo(id) {
    return TodoService.deleteTodo(id).then(resp => {
      this.todos = this.todos.filter(todo => todo.id !== id);
    });
  }

  updateTodo(id, newText) {
    return TodoService.updateTodo(id, newText).then(resp => {
      const todoIndex = this.todos.findIndex(todo => todo.id === id);
      this.todos[todoIndex].title = newText;
    });
  }

  setSearchQuery(query) {
    this.searchQuery = query.toString().toLowerCase();
  }

  searchTodos(todos) {
    return todos.filter(todo =>
      todo.title
        .toString()
        .toLowerCase()
        .includes(this.searchQuery)
    );
  }
}

export default decorate(Todo, {
  todos: observable,
  searchQuery: observable,
  isFetching: observable,
  todoList: computed,
  incompletedTodos: computed,
  completedTodos: computed,
  fetchTodos: action,
  createTodo: action,
  searchTodos: action,
  setSearchQuery: action
});
