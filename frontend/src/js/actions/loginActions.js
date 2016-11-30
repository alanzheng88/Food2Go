import dispatcher from "../dispatcher";
import axios from "axios";
import {host, port} from "../constants/backend.js"

export function authenticateUser(text) {
  console.log("Sending the data!", text);
  axios({
    method: 'POST',
    url: `http://${host}:${port}/api/authenticate`,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    withCredentials: true,
    auth: {
        username: text.email,
        password: text.password
    },
  })
  .then((response) => {
    dispatcher.dispatch({
    	type: "AUTH_SUCCESS",
    	response
    });
    console.log("got the response!", response);
  })
  .catch((error) => {
    console.log("Action: authenticateUser error", error);
  	dispatcher.dispatch({
      	type: "AUTH_FAILURE",
      	error,
      });
  })
}

export function getUserInfo() {
  axios({
    method: 'GET',
    url: `http://${host}:${port}/api/user`,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    withCredentials: true,
  })
  .then((response) => {
    console.log("Action: getUserInfo response", response);
    dispatcher.dispatch({
      type: "UPDATE_USERINFO",
      response,
    });
  })
  .catch((error) => {
    console.log("Action: getUserInfo error");
    dispatcher.dispatch({
      type: "UPDATE_USERINFO_ERROR",
    });
  })
}

export function getUserRestaurants() {
  axios({
    method: 'GET',
    url: `http://${host}:${port}/api/user?query=restaurants`,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    withCredentials: true,
  })
  .then((response) => {
    console.log("Action: getUserRestaurants response", response);
    dispatcher.dispatch({
      type: "UPDATE_USERRESTAURANTS",
      response,
    });
  })
  .catch((error) => {
    console.log("Action: getUserRestaurants error", error);
    dispatcher.dispatch({
      type: "UPDATE_USERRESTAURANTS_ERROR",
    });
  })
}

export function logoutUser() {
	axios({
    method: 'DELETE',
    url: `http://${host}:${port}/api/authenticate`,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    withCredentials: true,
  })
  .then((response) => {
	  dispatcher.dispatch({type: "LOGOUT"});
	  console.log("got the response!", response);
  })
  .catch((error) => {
    console.log("Fail to delete authentication!, logout anyway.");
    dispatcher.dispatch({
      type: "LOGOUT",
    });
  })
}
