import { computed, observable, action } from "mobx";
import TodoService from "../services/firebase";

export interface Todo {
  id: string,
  title: string,
  isDone: boolean,
  user: string
}

class TodoStore {
  @observable userStore: any;
  @observable todos: Todo[];
  @observable isFetching: boolean;
  @observable searchQuery: string;

  constructor(rootStore: any) {
    this.userStore = rootStore.userStore;
    this.todos = [];
    this.isFetching = true;
    this.searchQuery = "";
  }

  @computed
  get todoList() {
    return this.searchQuery ? this.searchTodos(this.todos) : this.todos;
  }

  @computed
  get incompletedTodos() {
    return this.todoList.filter((todo: Todo) => !todo.isDone);
  }

  @computed
  get completedTodos() {
    return this.todoList.filter((todo: Todo) => todo.isDone);
  }

  @action
  fetchTodos() {
    if (this.userStore.user) {
      this.isFetching = true;
      TodoService.getUsersTodos(this.userStore.user.uid).then((todos: any) => {
        this.todos = todos;
        this.isFetching = false;
      });
    }
  }

  @action
  createTodo(todo: string) {
    return TodoService.addTodo(todo).then((newTodo: any) => {
      newTodo.get().then((data: any) => {
        this.todos = [{ id: data.id, ...data.data() }, ...this.todos];
      });
      return newTodo;
    });
  }

  @action
  markAsDone(id: string) {
    return TodoService.markAsDone(id).then(resp => {
      const todoIndex = this.todos.findIndex((todo: Todo) => todo.id === id);
      this.todos[todoIndex] = { ...this.todos[todoIndex], isDone: true };
    });
  }

  @action
  deleteTodo(id: string) {
    return TodoService.deleteTodo(id).then(resp => {
      this.todos = this.todos.filter((todo: Todo) => todo.id !== id);
    });
  }

  @action
  updateTodo(id: string, newText: string) {
    return TodoService.updateTodo(id, newText).then(resp => {
      const todoIndex = this.todos.findIndex((todo: Todo) => todo.id === id);
      this.todos[todoIndex] = { ...this.todos[todoIndex], title: newText };
    });
  }

  @action
  setSearchQuery(query: string) {
    this.searchQuery = query.toString().toLowerCase();
  }

  @action
  searchTodos(todos: Todo[]) {
    return todos.filter((todo: Todo) =>
      todo.title
        .toString()
        .toLowerCase()
        .includes(this.searchQuery)
    );
  }
}

export default TodoStore;
