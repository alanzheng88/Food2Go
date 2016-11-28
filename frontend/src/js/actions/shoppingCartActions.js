import dispatcher from "../dispatcher";
import axios from "axios";
import {host, port} from "../constants/backend.js"

export function getFoodList(text) {
  console.log("Sending the data!", text);
  axios.post(`http://${host}:${port}/api/shopping-cart@foodid=${text}`).then((response) => {
    dispatcher.dispatch({
    	type: "GET_SC_RESPONSE",
    	response
    });
    console.log("Action: shoppingCart response!", response);
  })
  .catch((error) => {
    console.log("Action: shoppingCart error", error);
  	dispatcher.dispatch({
      	type: "GET_SC_ERROR",
      	error,
      });
  })
}

}
