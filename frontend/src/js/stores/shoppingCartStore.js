import { EventEmitter } from "events";

import dispatcher from "../dispatcher";
import cookie from 'react-cookie';
import axios from "axios";
import {host, port} from "../constants/backend.js"

class ShoppingCartStore extends EventEmitter {
  constructor() {
    super()
    this.foodList = [
      {
        name: 'Pasta',
        foodId: 'abc',
        resturantId: 'abc',
        restaurantName: 'Pasta factory',
        originalPrice: '12.0',
        status: 'In stock',
        discountedPrice: '8.0',
      },
      {
        name: 'Pasta2',
        foodId: 'abc',
        resturantId: 'abc',
        restaurantName: 'Pasta factory',
        originalPrice: '12.0',
        status: 'In stock',
        discountedPrice: '8.0',
      }
    ]
    }
  }
  
  handleActions(action) {
    switch(action.type) {
      case "ADD_FOOD": {
        this.foodList.push(action.response.data);
        this.emit("add_food");
        console.log("Store: emitting add_food");
        break;
      }
    }
  }
}

const shoppingCartStore = new ShoppingCartStore;
dispatcher.register(shoppingCartStore.handleActions.bind(shoppingCartStore));

export default userStore;
