import TodoStore from "./todos";
import UserStore from "./user";

class Store {
  userStore: UserStore;
  todoStore: TodoStore;

  constructor() {
    this.userStore = new UserStore();
    this.todoStore = new TodoStore(this);
  }
}

export default new Store();
