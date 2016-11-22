import dispatcher from "../dispatcher";
import axios from "axios";

export function authenticaUser(text) {
  console.log("Sending the data!", text);
  axios.post('http://localhost:9000/api/authenticate', text)
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

export function loginUser(sessionID) {
	axios.get('http://localhost:9000/api/authenticate?sessionID='+sessionID).then((response) => {
		console.log(response.data);
	    console.log(response.status);
	    console.log(response.statusText);
	    console.log(response.headers);
	    console.log(response.config);
		dispatcher.dispatch({type: "LOGIN"});
		console.log("got the response!", response);
  })
}

export function logoutUser(sessionID) {
	axios.delete('http://localhost:9000/api/authenticate?sessionID='+sessionID).then((response) => {
	dispatcher.dispatch({type: "LOGOUT"});
	console.log("got the response!", response);
  })
}
