import dispatcher from "../dispatcher";
import axios from "axios";
export function loginUser(text) {
  console.log("Sending the data!", text);
  axios.post('http://localhost:9000/api/authentication', text).then((response) => {
      dispatcher.dispatch({type: "LOGIN"});
      console.log("got the response!", response);
  })
}

export function logoutUser(sessionID) {
	axios.delete('http://localhost:9000/api/authentication?sessionID='+sessionID).then((response) => {
	dispatcher.dispatch({type: "LOGOUT"});
	console.log("got the response!", response);
  })
}
  