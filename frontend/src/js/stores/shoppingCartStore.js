import { EventEmitter } from "events";

import dispatcher from "../dispatcher";
import cookie from 'react-cookie';
import axios from "axios";
import {host, port} from "../constants/backend.js"

class ShoppingCartStore extends EventEmitter {
  constructor() {
    super()
    this.foods = {
      sessionId:this.guid(),
      loginStatus:false,
    }
  }
  
  handleActions(action) {
    switch(action.type) {
      case "ADD_FOOD": {
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
