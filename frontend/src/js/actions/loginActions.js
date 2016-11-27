import dispatcher from "../dispatcher";
import axios from "axios";
import {host, port} from "../constants/backend.js"

export function authenticateUser(text) {
  console.log("Sending the data!", text);
  // axios.post(`http://${host}:${port}/api/authenticate`, {
  //     headers: { 'content-type': 'application/json'},
  //     auth: {
  //       username: text.email,
  //       password: text.password
  //     },
  // })
  axios({
    method: 'POST',
    url: `http://${host}:${port}/api/authenticate`,
    headers: {'Content-Type': 'application/json'},
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

export function getUserInfo(sessionId) {
	axios.get(`http://${host}:${port}/api/user`, 
    {
      headers: {
        'Content-Type': 'application/json',
      }
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
      dispatcher.dispatch( {
        type: "UPDATE_USERINFO",
        response : {
          firstName: 'test',
          lastName: 'test',
          email: 'test@sfu.ca',
          role: 'restaurantOwner',
          restaurants: [],
        }
      });
    })
}

export function logoutUser(sessionId) {
	axios({
    method: 'DELETE',
    url: `http://${host}:${port}/api/authenticate?sessionid=${sessionId}`,
    headers: {'Content-Type': 'application/json'}
  }
  ).then((response) => {
	dispatcher.dispatch({type: "LOGOUT"});
	console.log("got the response!", response);
  })
}
