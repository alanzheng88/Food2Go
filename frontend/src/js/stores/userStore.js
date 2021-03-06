import { EventEmitter } from "events";

import dispatcher from "../dispatcher";
import cookie from 'react-cookie';
import axios from "axios";
import {host, port} from "../constants/backend.js"

class UserStore extends EventEmitter {
  constructor() {
    super()
    var sessionId = cookie.load('SESSIONID');
    var userInfo = cookie.load('USERINFO');

    if (sessionId === undefined) {
      this.session = {
        sessionId:'',
        loginStatus:false,
      };
      this.userInfo = this.getGuestInfo();
    } else {
      this.session = {
        sessionId:sessionId,
        loginStatus:true,
      }
      if(userInfo === undefined) {
        this.userInfo = this.getGuestInfo();
      } else {
        this.userInfo = userInfo;
      }

    }
    this.sessionInit();
  }

  sessionInit() {
    const sessionId = cookie.load('SESSIONID');
    if (sessionId !== undefined) {
      axios({
        method: 'GET',
        url: `http://${host}:${port}/api/authenticate`,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        withCredentials: true,
      })
      .then((response) => {
        console.log("found valid cookie", response)
        if (response.status == 200 ) {
          this.emit("auth_success", true);
        } else {
          cookie.remove('SESSIONID', { path: '/' });
          cookie.remove('USERINFO', { path: '/' });
          this.emit("logout", false);
        }
      })
      .catch((error) => {
        cookie.remove('SESSIONID', { path: '/' });
        cookie.remove('USERINFO', { path: '/' });
        this.emit("logout", false);
      })
    }
  }
  
  getGuestInfo() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      role: 'guest',
    };
  }

  getUserInfo() {
    return this.userInfo;
  }

  getLoginStatus() {
    return this.session.loginStatus;
  }

  handleActions(action) {
    switch(action.type) {
      case "AUTH_SUCCESS": {
        console.log("Store received Autentication: ", action);
        if (action.response.status === 201 || action.response.status === 200) {
          //Save the session id to cookie
          //cookie.save('sessionId', this.session.sessionId, { path: '/' });
          this.session.loginStatus = true;  
          this.emit("auth_success", this.session.loginStatus);
          this.emit("login");
          console.log("Store: emitting auth_success");
        } else {
          console.log("Store: Status code in response is not 200 or 201. Status code :" + action.response.status);
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
        cookie.save('USERINFO', this.userInfo, { path: '/' });
        this.emit("update_userinfo", this.userInfo);
        break;
      }
      case "UPDATE_USERRESTAURANTS": {
        console.log("Store: received UPDATE_USERINFO, data: ", action.response.data)
        this.userInfo.restaurants = action.response.data;
        this.emit("update_userRestaurants", this.userInfo);
        break;
      }
      case "UPDATE_USERINFO_ERROR": {
        console.log("Store: received UPDATE_USERINFO, data: ")
        this.session.loginStatus = false;
        this.userInfo = this.getGuestInfo();
        this.emit("logout", false);        
        this.emit("update_userinfo", this.userInfo);
        break;
      }
      case "LOGOUT": {
        cookie.remove('SESSIONID', { path: '/' });
        cookie.remove('USERINFO', { path: '/' });
        this.session.loginStatus = false;
        this.userInfo = this.getGuestInfo();
        this.emit("logout", false);
        this.emit("update_userinfo", this.userInfo);
        break;
      }
    }
  }
}

const userStore = new UserStore;
dispatcher.register(userStore.handleActions.bind(userStore));

export default userStore;
