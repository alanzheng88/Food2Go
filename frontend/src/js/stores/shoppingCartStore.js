import { EventEmitter } from "events";

import dispatcher from "../dispatcher";
import cookie from 'react-cookie';
import axios from "axios";
import {host, port} from "../constants/backend.js"

class ShoppingCartStore extends EventEmitter {
  constructor() {
    super()
    this.foodIdList = cookie.load('cartId');
    if (this.foodIdList === undefined || this.foodIdList.length === 0) {
      this.foodIdList = [ {foodId:'1', amount:2},{foodId:'2', amount:1}];
    }
    this.foodInfoList = cookie.load('cartInfo');;
    if (this.foodInfoList === undefined) {
      this.foodInfoList = [];
    }
  }

  mockData() {
    return [{
        name: 'Pasta',
        foodId: '1',
        resturantId: 'abc',
        restaurantName: 'Pasta factory',
        originalPrice: 12.23,
        totalPrice: 12.23,
        status: 'In stock',
        amount: 1,
        img: 'http://icons.iconarchive.com/icons/custom-icon-design/flatastic-2/72/product-icon.png',
      },{
        name: 'Pasta2',
        foodId: '2',
        resturantId: 'bcd',
        restaurantName: 'Pasta factory2',
        originalPrice: 15.34,
        totalPrice: 15.34,
        status: 'In stock',
        amount: 1,
        img: 'http://icons.iconarchive.com/icons/custom-icon-design/flatastic-2/72/product-icon.png',
    }];
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
        }
        contains = true;
        console.log("addFoodId this should be true: ", contains);
        break;
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
    cookie.save('cart', this.foodIdList, { path: '/' });
  }
  
  removeFood(id) {
    console.log("removeFood: ", id);
    this.foodIdList = this.foodIdList.filter(function(item) { return item.foodId !== id });
    this.foodInfoList = this.foodInfoList.filter(function(item) { return item.foodId !== id });
    console.log("after removeFood: ", this.foodIdList);
    cookie.save('cart', this.foodIdList, { path: '/' });
  }

  appendAmountToFoodInfo(foodInfoArray) {
      for (var i = 0; i < this.foodIdList.length; i++) {
        for (var j = 0; j < foodInfoArray.length; j++) {
          if(foodInfoArray[j].foodId === this.foodIdList[i].foodId) {
            foodInfoArray[j].amount = this.foodIdList[i].amount;
            foodInfoArray[j].totalPrice = Number((foodInfoArray[j].amount*foodInfoArray[j].originalPrice).toFixed(2));
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
        this.foodInfoList = this.appendAmountToFoodInfo(action.response);
        cookie.save('cartInfo', this.foodInfoList,{ path: '/' } );
        // console.log("Store: emitting updateFoodList_error:", this.foodInfoList);
        this.emit("updateFoodList_error", this.foodInfoList);
        console.log("Store: emitting updateFoodList_error");
        break;
      }
      case "ADD_FOOD": {
        this.addFoodId(action.foodId);
        this.emit("updateFoodIdList", this.foodInfoList);
        break;
      }
      case "REMOVE_FOOD": {
        this.removeFood(action.foodId);
        this.emit("updateFoodIdList", this.foodIdList.length);        
        break;
      }
      case "CLEAR_CART": {
        cookie.remove('CART', { path: '/' });
        cookie.remove('CARTINFO', { path: '/' });
        this.foodIdList=[];
        this.foodInfoList = [];
        break;
      }
      case "CHECKOUT_SUCCESS": {
        cookie.remove('CART', { path: '/' });
        cookie.remove('CARTINFO', { path: '/' });
        this.foodIdList=[];
        this.foodInfoList = [];
        this.emit("checkout_success");
        break;
      }
      case "CHECKOUT_FAILURE": {
        // cookie.remove('CART', { path: '/' });
        // cookie.remove('CARTINFO', { path: '/' });
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
