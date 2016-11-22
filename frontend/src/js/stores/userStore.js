import { EventEmitter } from "events";

import dispatcher from "../dispatcher";

class UserStore extends EventEmitter {
  constructor() {
    super()
    this.user = {
      sessionID: this.guid(),
      loginStatus: false,
    };
    this.userInfo = {
          firstName: "hello",
          lastName: "world",
          email: "helloworld@123.com",
          role: "Owner",
          restaurants: [],
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

  getLoginStatus() {
    return this.user.loginStatus;
  }
  handleActions(action) {
    switch(action.type) {
      case "AUTH_SUCCESS": {
        console.log("Received Autentication action print out data: ", action.response.status);
        if (action.response.status == 200) {
          this.user.loginStatus = true;  
          this.emit("loginStatusChange", this.user.loginStatus);
          console.log("emitting loginStatusChange");
        } else {
          this.emit("failToAuthenticate");
          console.log("Status code in response is not 200. Status code :"+action.response.status);
        }
        break;        
      }
      case "AUTH_FAILURE": {
        this.emit("failToAuthenticate");
        console.log("emitting failToAuthenticate");
        break;
      }
      case "LOGIN": {
        //console.log("Received login action print out data: ", action.userInfo.restaurants.length);
        break;
      }
      case "LOGOUT": {
        // this.createTodo(action.text);
        this.user = {
          sessionID: this.guid(),
          loginStatus: false,
        };
        this.emit("loginStatusChange");
        break;
      }
    }
  }

}

const userStore = new UserStore;
dispatcher.register(userStore.handleActions.bind(userStore));

export default userStore;
