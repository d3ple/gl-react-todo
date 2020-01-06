import { computed, decorate, observable, action } from "mobx";
import UserService from "../services/firebase";

class User {
  user = null;

  setUser(user) {
    this.user = user;
  }
}

export default decorate(User, {
  user: observable,
  fetchTodos: action
});
