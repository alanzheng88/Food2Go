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
import CreateRestaurant from "./pages/createRestaurant";
import Restaurant from "./pages/restaurant";
import NoMatch from "./pages/noMatch";
import AboutUs from "./pages/aboutus";
import FAQ from "./pages/faq";
import WhatIsNew from "./pages/whatisnew";
import Privacy from "./pages/privacy";


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
    <Route path="invite" component={Invite}/>
    <Route path="/restaurant/create" component={CreateRestaurant}/>
    <Route path="restaurant/:restaurantId" component={Restaurant}/>
    <Route path="aboutus" component={AboutUs}/>
    <Route path="faq" component={FAQ}/>
    <Route path="whatisnew" component={WhatIsNew}/>
    <Route path="privacy" component={Privacy}/>
    <Route path="/*" component={NoMatch}/>
    
    </Route>
  </Router>
  ), app)
