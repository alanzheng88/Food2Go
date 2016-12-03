import { EventEmitter } from "events";

import dispatcher from "../dispatcher";
import cookie from 'react-cookie';
import axios from "axios";
import {host, port} from "../constants/backend.js"

class ShoppingCartStore extends EventEmitter {
  constructor() {
    super()
    this.foodIdList = cookie.load('cartId');
    if (this.foodIdList === undefined) {
      this.foodIdList = [];
    }
    this.foodInfoList = cookie.load('cartInfo');;
    if (this.foodInfoList === undefined) {
      this.foodInfoList = [];
    }
  }

  getFoodIds(){
    var foodIdList = this.foodIdList;
    console.log("ShoppingCartStore::getFoodIdsInString: ", foodIdList);
    var res = [];
    if(foodIdList === undefined || foodIdList.length === 0) {
      console.log("ShoppingCartStore::getFoodIdsInString: empty foodId");
    } else {
      var arrayLength = foodIdList.length;
      for (var i = 0; i < arrayLength; i++) {
        res.push(foodIdList[i].foodId);
      }
    }
    console.log("ShoppingCartStore::getFoodIdsInString: res:", res);
    return res;
  }

  getFoodInfo() {
    var foodInfoList = cookie.load('cartInfo');
    return foodInfoList;
  }

  setFoodInfo(foodList) {
    this.foodInfoList = foodList;
    cookie.save('cartInfo', this.foodInfoList,{ path: '/' } );;
    console.log("ShoppingCartStore::setFoodInfo: ", this.foodInfoList)
  }

  addFoodId(id) {
    var contains = false;
    if(this.foodIdList === undefined) {
      this.foodIdList = [];
    } else {
      var arrayLength = this.foodIdList.length;
      for (var i = 0; i < arrayLength; i++) {
        if (this.foodIdList[i].foodId === id) {
          this.foodIdList[i].amount++;
          contains = true;
          console.log("addFoodId this should be true: ", contains);
          break;
        }
      }
    }
    if (!contains) {
        this.foodIdList.push(
        {
          foodId: id,
          amount: 1,
        });
    }
    console.log("Print before save to cookie: ", this.foodIdList);
    cookie.save('cartId', this.foodIdList, { path: '/' });
  }
  
  removeFood(id) {
    console.log("removeFood: ", id);
    this.foodIdList = this.foodIdList.filter(function(item) { return item.foodId !== id });
    this.foodInfoList = this.foodInfoList.filter(function(item) { return item.id !== id });
    console.log("after removeFood: ", this.foodIdList);
    cookie.save('cartId', this.foodIdList, { path: '/' });
  }

  appendAmountToFoodInfo(foodInfoArray) {
      for (var i = 0; i < this.foodIdList.length; i++) {
        for (var j = 0; j < foodInfoArray.length; j++) {
          console.log("!!!, ", foodInfoArray[j],this.foodIdList[i] );          
          if(foodInfoArray[j].id === this.foodIdList[i].foodId) {

            foodInfoArray[j].amount = this.foodIdList[i].amount;
            foodInfoArray[j].totalPrice = Number((foodInfoArray[j].amount*foodInfoArray[j].price).toFixed(2));
            console.log("!!!, ", foodInfoArray[j]);
            break;
          }
        }
      }
      return foodInfoArray;
  }

  handleActions(action) {
    switch(action.type) {
      case "GET_SC_RESPONSE": {
        this.foodInfoList = this.appendAmountToFoodInfo(action.response.data);
        cookie.save('cartInfo', this.foodInfoList,{ path: '/' } );
        // console.log("Store: emitting updateFoodList:", this.foodInfoList);
        
        this.emit("updateFoodList", this.foodInfoList);
        break;
      }
      case "GET_SC_ERROR": {
        this.foodInfoList = []
        cookie.save('cartInfo', this.foodInfoList,{ path: '/' } );
        // console.log("Store: emitting updateFoodList_error:", this.foodInfoList);
        this.emit("updateFoodList_error", this.foodInfoList);
        console.log("Store: emitting updateFoodList_error");
        break;
      }
      case "ADD_FOOD": {
        this.addFoodId(action.foodId);
        this.emit("updateFoodIdList", this.foodIdList.length);
        break;
      }
      case "REMOVE_FOOD": {
        this.removeFood(action.foodId);
        this.emit("updateFoodIdList", this.foodIdList.length);        
        break;
      }
      case "CLEAR_CART": {
        cookie.remove('cartId', { path: '/' });
        cookie.remove('cartInfo', { path: '/' });
        this.foodIdList=[];
        this.foodInfoList = [];
        this.emit("updateFoodIdList", this.foodIdList.length);                
        break;
      }
      case "CHECKOUT_SUCCESS": {
        cookie.remove('cartId', { path: '/' });
        cookie.remove('cartInfo', { path: '/' });
        this.foodIdList=[];
        this.foodInfoList = [];
        this.emit("checkout_success");
        break;
      }
      case "CHECKOUT_FAILURE": {
        // cookie.remove('cartId', { path: '/' });
        // cookie.remove('cartInfo', { path: '/' });
        // this.foodIdList=[];
        // this.foodInfoList = [];
        this.emit("checkout_success");
        break;
      }
    }
  }
}

const shoppingCartStore = new ShoppingCartStore;
dispatcher.register(shoppingCartStore.handleActions.bind(shoppingCartStore));

export default shoppingCartStore;
