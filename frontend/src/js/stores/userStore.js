import { EventEmitter } from "events";

import dispatcher from "../dispatcher";

class UserStore extends EventEmitter {
  constructor() {
    super()
    this.user = {
      userName: '',
      password: '',
      sessionID: this.guid(),
    };
  }

  guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  }

  getUser() {
    return this.user;
  }

  getGuid() {
    return this.user.sessionID;
  }

  handleActions(action) {
    switch(action.type) {
      case "LOGIN": {
        // this.createTodo(action.text);
        console.lgo("userStore: ", action.text);
        this.emit("change");
        break;
      }
      case "LOGOUT": {
        // this.createTodo(action.text);
        this.emit("change");
        break;
      }
    }
  }

}

const userStore = new UserStore;
dispatcher.register(userStore.handleActions.bind(userStore));

export default userStore;
