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
          firstName: "hello",
          lastName: "world",
          email: "helloworld@123.com",
          role: "Owner",
          restaurants: [],
    };
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
          this.emit("sessionStatusChange", this.session.loginStatus);
        }
      })
    }
  }
  
  getSession() {
    return this.session;
  }

  getGuid() {
    return this.session.sessionId;
  }

  getLoginStatus() {
    return this.session.loginStatus;
  }
  handleActions(action) {
    switch(action.type) {
      case "AUTH_SUCCESS": {
        console.log("Received Autentication action print out data: ", action.response.status);
        if (action.response.status == 200) {
          //Save the session id to cookie
          cookie.save('sessionId', this.session.sessionId, { path: '/' });
          this.session.loginStatus = true;  
          this.emit("sessionStatusChange", this.session.loginStatus);
          console.log("emitting sessionStatusChange");
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
        cookie.remove('sessionId', { path: '/' });
        this.session = {
          sessionId: this.guid(),
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
