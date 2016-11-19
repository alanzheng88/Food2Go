import { EventEmitter } from "events";

import dispatcher from "../dispatcher";

class LoginStore extends EventEmitter {
  constructor() {
    super()
  }
  handleActions(action) {
    switch(action.type) {
      case "LOGIN": {
        // this.createTodo(action.text);
        this.emit("change");
        break;
      }
    }
  }
}

const loginStore = new LoginStore;
dispatcher.register(loginStore.handleActions.bind(loginStore));

export default loginStore;
