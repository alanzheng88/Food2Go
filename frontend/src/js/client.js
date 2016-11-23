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
import UserInfo from "./pages/userInfo";
import Restaurants from "./pages/restaurants";
import ShoppingCart from "./pages/shoppingCart";

const app = document.getElementById('app');

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={Layout}>
      <IndexRoute component={Food2Go}></IndexRoute>
      <Route path="Restaurants" name="Restaurants" component={Restaurants}></Route>
      <Route path="UserInfo" name="UserInfo" component={UserInfo}></Route>
      <Route path="Login" name="Login" component={Login}></Route>
      <Route path="Register" name="Register" component={Register}></Route>
      <Route path="ShoppingCart" name="ShoppingCart" component={ShoppingCart}></Route>
    </Route> 
  </Router>,
app);
