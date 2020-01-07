import { computed, decorate, observable, action } from "mobx";
//("nur@nur.nur", "nurnurnur")

class User {
  constructor() {
    this.user = null;
  }

  get isAuth() {
    return !!this.user;
  }

  setUser(user) {
    this.user = user;
  }
}

export default decorate(User, {
  user: observable,
  isAuth: computed,
  setUser: action
});
