import { computed, decorate, observable, action } from "mobx";
import TodoService from "../services/firebase";

class Todo {
  constructor(rootStore) {
    this.userStore = rootStore.userStore;
    this.todos = [];
    this.isLoading = false;
    this.searchQuery = "";
  }

  get incompletedTodos() {
    return this.todos.filter(task => !task.isDone);
  }

  get completedTodos() {
    return this.todos.filter(task => task.isDone);
  }

  get searchResults() {
    return this.todos.filter(todo =>
      todo.title
        .toString()
        .toLowerCase()
        .includes(this.searchQuery)
    );
  }

  setSearchQuery(query) {
    this.searchQuery = query.toString().toLowerCase();
  }

  fetchTodos() {
    if (this.userStore.user) {
      TodoService.getUsersTodos(this.userStore.user.uid).then(todos => {
        this.todos = todos;
      });
    }
  }

  createTodo(todo) {
    return TodoService.addTodo(todo).then(newTodo => {
      newTodo.get().then(data => {
        this.todos = [...this.todos, { id: data.id, ...data.data() }];
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
}

export default decorate(Todo, {
  todos: observable,
  isLoading: observable,
  searchQuery: observable,
  fetchTodos: action,
  createTodo: action,
  incompletedTodos: computed,
  completedTodos: computed,
  searchResults: computed
});
