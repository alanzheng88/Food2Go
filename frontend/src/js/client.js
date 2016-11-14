import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, hashHistory } from "react-router";

import Layout from "./pages/Layout";
import Food2Go from "./pages/Food2Go";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserInfo from "./pages/UserInfo";
import Restaurants from "./pages/Restaurants";
import ShoppingCart from "./pages/ShoppingCart";




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
