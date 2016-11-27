import React from "react";
import ReactDOM from "react-dom";
import $ from "jquery";
import { Router, Route, IndexRoute, hashHistory } from "react-router";
import Validation from 'react-validation';
import "./components/extend";

import Layout from "./pages/layout";
import Food2Go from "./pages/food2Go";
import Login from "./pages/login";
import Register from "./pages/register";
import Account from "./pages/account";
import Restaurants from "./pages/restaurants";
import ShoppingCart from "./pages/shoppingCart";
import Orders from "./pages/orders";
import Points from "./pages/points";
import Coupons from "./pages/coupons";
import Settings from "./pages/settings";
import CreateRestaurant from "./pages/createRestaurant";
import Restaurant from "./pages/restaurant";
import NoMatch from "./pages/noMatch";

const app = document.getElementById('app');

ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={Layout}>
      <IndexRoute component={Food2Go}></IndexRoute>
      <Route path="restaurants" component={Restaurants}/>
      <Route path="account" component={Account}/>
      <Route path="login" component={Login}/>
      <Route path="register" component={Register}/>
      <Route path="shoppingCart" component={ShoppingCart}/>
	  <Route path="orders" component={Orders}/>
	  <Route path="points" component={Points}/>
	  <Route path="coupons" component={Coupons}/>
	  <Route path="settings" component={Settings}/>
	  <Route path="/restaurant/create" component={CreateRestaurant}/>
	  <Route path="restaurant/:restaurantId" component={Restaurant}/>
	  <Route path="/*" component={NoMatch}/>
    </Route> 
  </Router>
  ), app)
