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
import Order from "./pages/order";
import Points from "./pages/points";
import Coupons from "./pages/coupons";
import Settings from "./pages/settings";
import CreateRestaurant from "./pages/createRestaurant";
import Restaurant from "./pages/restaurant";
import NoMatch from "./pages/noMatch";
import AboutUs from "./pages/aboutus";
import Checkout from "./pages/checkout";
import FAQ from "./pages/faq";
import WhatIsNew from "./pages/whatisnew";
import Privacy from "./pages/privacy";
import OrderNow from "./pages/ordernow";
import ContactUs from "./pages/contactus";
import CustomerService from "./pages/customerservice";
import TermsOfService from "./pages/termsofservice";


const app = document.getElementById('app');

ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={Layout}>
    <IndexRoute component={Food2Go}></IndexRoute>
    <Route path="checkout" component={Checkout}/>
    <Route path="restaurants" component={Restaurants}/>
    <Route path="account" component={Account}/>
    <Route path="login" component={Login}/>
    <Route path="register" component={Register}/>
    <Route path="shoppingcart" component={ShoppingCart}/>
    <Route path="orders" component={Orders}/>
    <Route path="orders/:orderId" component={Order}/>
    <Route path="points" component={Points}/>
    <Route path="coupons" component={Coupons}/>
    <Route path="invite" component={Points}/>
    <Route path="/restaurants/create" component={CreateRestaurant}/>
    <Route path="restaurants/:restaurantId" component={Restaurant}/>
    <Route path="aboutus" component={AboutUs}/>
    <Route path="faq" component={FAQ}/>
    <Route path="whatisnew" component={WhatIsNew}/>
    <Route path="privacy" component={Privacy}/>
    <Route path="restaurants/1/ordernow" component={OrderNow}/>
    <Route path="customerservice" component={CustomerService}/>
    <Route path="contactus" component={ContactUs}/>
    <Route path="termsofservice" component={TermsOfService}/>
    <Route path="/*" component={NoMatch}/>
    </Route>
  </Router>
  ), app)
