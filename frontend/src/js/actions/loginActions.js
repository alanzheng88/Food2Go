import dispatcher from "../dispatcher";
import axios from "axios";
import {host, port} from "../constants/backend.js"

export function authenticateUser(text) {
  console.log("Sending the data!", text);
  console.log("Print constant!", host);
  axios.post(`http://${host}:${port}/api/authenticate`, text)
  .then((response) => {
  	console.log(response.data);
    console.log(response.status);
    console.log(response.statusText);
    console.log(response.config);
      dispatcher.dispatch({
      	type: "AUTH_SUCCESS",
      	response
      });
      console.log("got the response!", response);
  })
  .catch((error) => {
  	dispatcher.dispatch({
      	type: "AUTH_FAILURE",
      	error,
      });
      console.log("Cannot get the data, fake the login");
  })
}

export function loginUser(sessionId) {
	axios.get(`http://${host}:${port}/api/authenticate?sessionid=${sessionId}`).then((response) => {
		console.log(response.data);
	    console.log(response.status);
	    console.log(response.statusText);
	    console.log(response.headers);
	    console.log(response.config);
		dispatcher.dispatch({type: "LOGIN"});
		console.log("got the response!", response);
  })
  .catch((error) => {
    dispatcher.dispatch({
        type: "AUTH_FAILURE",
        error,
      });
      console.log("Cannot get the data, fake the login");
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
