import dispatcher from "../dispatcher";
import axios from "axios";
import {host, port} from "../constants/backend.js"

export function getFoodList(text) {
  console.log("shoppingCartAction::getFoodList:Sending data!", text);
  axios({
    method: 'GET',
    url: `http://${host}:${port}/api/shopping-cart@foodid=${text}`,
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
        response: [{
            name: 'Pasta',
            foodId: '1',
            resturantId: 'abc',
            restaurantName: 'Pasta factory',
            originalPrice: 12.23,
            status: 'In stock',
            img: 'http://icons.iconarchive.com/icons/custom-icon-design/flatastic-2/72/product-icon.png',
          },{
            name: 'Pasta2',
            foodId: '2',
            resturantId: 'bcd',
            restaurantName: 'Pasta factory2',
            originalPrice: 15.34,
            status: 'In stock',
            img: 'http://icons.iconarchive.com/icons/custom-icon-design/flatastic-2/72/product-icon.png',
        }],
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
    foodId
  });  
}



