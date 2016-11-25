import { EventEmitter } from "events";

import dispatcher from "../dispatcher";
import cookie from 'react-cookie';
import axios from "axios";
import {host, port} from "../constants/backend.js"

class UserStore extends EventEmitter {
  constructor() {
    super()
    this.session = {
      sessionId:this.guid(),
      loginStatus:false,
    }
    this.userInfo = {
          firstName: '',
          lastName: '',
          email: '',
          role: 'guest',
          restaurants: [],
    };
    console.log("user store constructor")
    this.sessionInit();
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

  sessionInit() {
    const sessionId = cookie.load('sessionId');
    if (sessionId !== undefined) {
      console.log("Cached sessionId: " + sessionId);
      axios.get(`http://${host}:${port}/api/authenticate?sessionid=${sessionId}`)
      .then((response) => {
        if (response.status == 200) {
          this.session.sessionId = sessionId;
          this.session.loginStatus = true;  
          this.emit("auth_success", this.session.loginStatus);
        } else {
          cookie.remove('sessionId', { path: '/' });          
        }
      })
    }
  }
  
  getUserInfo() {
    console.log(this.userInfo);
    return this.userInfo;
  }

  getSessionId() {
    return this.session.sessionId;
  }

  getLoginStatus() {
    return this.session.loginStatus;
  }
  handleActions(action) {
    switch(action.type) {
      case "AUTH_SUCCESS": {
        console.log("Store received Autentication: ", action.response.status);
        if (action.response.status === 200) {
          //Save the session id to cookie
          cookie.save('sessionId', this.session.sessionId, { path: '/' });
          this.session.loginStatus = true;  
          this.emit("auth_success", this.session.loginStatus);
          this.emit("login");
          console.log("Store: emitting auth_success");
        } else {
          console.log("Store: Status code in response is not 200. Status code :"+action.response.status);
          this.emit("auth_failure");
        }
        break;
      }
      case "AUTH_FAILURE": {
        this.emit("auth_failure");
        console.log("Store: emitting auth_failure");
        break;
      }
      case "UPDATE_USERINFO": {
        console.log("Store: received UPDATE_USERINFO, data: ", action.response.data)
        this.userInfo = action.response.data;
        this.emit("update_userinfo", this.userInfo);
        break;
      }
      case "LOGOUT": {
        // this.createTodo(action.text);
        cookie.remove('sessionId', { path: '/' });
        this.session = {
          sessionId: this.guid(),
          loginStatus: false,
        };
        this.userInfo = {
          firstName: '',
          lastName: '',
          email: '',
          role: 'guest',
          restaurants: [],
        };
        this.emit("logout");
        this.emit("update_userinfo", this.userInfo);
        break;
      }
    }
  }
}

const userStore = new UserStore;
dispatcher.register(userStore.handleActions.bind(userStore));

export default userStore;
