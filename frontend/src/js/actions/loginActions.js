import dispatcher from "../dispatcher";
import axios from "axios";
export function loginUser(text) {
  console.log("Sending the data!", text);
  axios.post('http://localhost:9000/api/authentication', text)
  .then((response) => {
      dispatcher.dispatch({
      	type: "LOGIN"
      });
      console.log("got the response!", response);
  })
  .catch((error) => {
  	dispatcher.dispatch({
      	type: "LOGIN",
      	userInfo: {
      		firstName: "hello",
      		lastName: "world",
      		email: "helloworld@123.com",
      		role: "Owner",
      		restaurants: [],
      	}
      });
      console.log("Cannot get the data, fake the login");
  })
}

export function logoutUser(sessionID) {
	axios.delete('http://localhost:9000/api/authentication?sessionID='+sessionID).then((response) => {
	dispatcher.dispatch({type: "LOGOUT"});
	console.log("got the response!", response);
  })
}
