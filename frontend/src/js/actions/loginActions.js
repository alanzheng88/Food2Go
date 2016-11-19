import dispatcher from "../dispatcher";
import axios from "axios";
export function loginUser(text) {
  console.log("Sending the data!", text);
  axios.post('http://localhost:9000/api/authentication', text).then((data) => {
      dispatcher.dispatch({type: "LOGIN"});
      console.log("got the data!", data);
  })
}
