import Todos from "./todos";
import User from "./user";

class Store {
  constructor() {
    this.userStore = new User(this);
    this.todoStore = new Todos(this);
  }
}

export default new Store();
