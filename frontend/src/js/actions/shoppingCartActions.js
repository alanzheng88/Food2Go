import dispatcher from "../dispatcher";
import axios from "axios";
import {host, port} from "../constants/backend.js"

export function getFoodList(text) {
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
  })
  .catch((error) => {
  	dispatcher.dispatch({
      	type: "GET_SC_ERROR",
      	error
      });
  })
}

export function checkout(data) {
  console.log("checkout: ", data);
  axios({
    method: 'post',
    url: `http://${host}:${port}/api/user/orders`,
    withCredentials: true,
    data: JSON.stringify(data),
  })
  .then((response) => {
    dispatcher.dispatch({
      type: "CHECKOUT_SUCCESS",
      response
    });
  })
  .catch((error) => {
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



