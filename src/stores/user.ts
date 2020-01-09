import { computed, observable, action } from "mobx";

class UserStore {
  @observable user: any;

  constructor() {
    this.user = null;
    //("nur@nur.nur", "nurnurnur")
  }

  @computed
  get isAuth() {
    return !!this.user;
  }

  @action
  setUser(user: any) {
    this.user = user;
  }
}

export default UserStore;
