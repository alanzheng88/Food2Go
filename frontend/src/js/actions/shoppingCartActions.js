import dispatcher from "../dispatcher";
import axios from "axios";
import {host, port} from "../constants/backend.js"

export function getFoodList(text) {
  console.log("shoppingCartAction::getFoodList:Sending data!", text);
  axios({
    method: 'GET',
    url: `http://${host}:${port}/api/user/foods?id=${text}`,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    withCredentials: true,
  })
  .then((response) => {
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
      	error
      });
  })
}

export function checkout(text) {
  console.log("checkout: ", text);
  axios({
    method: 'POST',
    url: `http://${host}:${port}/api/user/orders`,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    withCredentials: true,
    data: text,
  })
  .then((response) => {
    console.log("ShoppingCartActions::checkout:response", response);
    dispatcher.dispatch({
      type: "CHECKOUT_SUCCESS",
      response
    });
    console.log("got the response!", response);
  })
  .catch((error) => {
    console.log("ShoppingCartActions::checkout:error", error);
    dispatcher.dispatch({
        type: "CHECKOUT_FAILURE",
        error,
      });
  })
}

export function addFoodToCart(foodId) {
  dispatcher.dispatch({
    type: "ADD_FOOD",
    foodId
  });
}

export function removeFoodInCart(foodId) {
  dispatcher.dispatch({
    type: "REMOVE_FOOD",
    foodId
  });
}

export function clearCart() {
  dispatcher.dispatch({
    type: "CLEAR_CART",
  });  
}



