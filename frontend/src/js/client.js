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
import Invite from "./pages/invite";
import Settings from "./pages/settings";


const app = document.getElementById('app');

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={Layout}>
      <IndexRoute component={Food2Go}></IndexRoute>
      <Route path="restaurants" name="restaurants" component={Restaurants}></Route>
      <Route path="account" name="account" component={Account}></Route>
      <Route path="login" name="login" component={Login}></Route>
      <Route path="register" name="register" component={Register}></Route>
      <Route path="shoppingCart" name="shoppingCart" component={ShoppingCart}></Route>
	  <Route path="orders" name="orders" component={Orders}></Route>
	  <Route path="points" name="points" component={Points}></Route>
	  <Route path="coupons" name="coupons" component={Coupons}></Route>
	  <Route path="invite" name="invite" component={Invite}></Route>
	  <Route path="settings" name="settings" component={Settings}></Route>
    </Route> 
  </Router>,
app);
