var frisby = require('frisby');
var server = require('../../lib/server');
var loginHelper = require('../../lib/login_helper');
var fixture = require('../../lib/fixture');
var restaurantHelper = require('../../lib/restaurant_helper');
var url = server.url;

var mikuValidRestaurantJson = {
  name: 'Miku',
  phoneNumber: '6041112222',
  email: 'miku@company.com',
  address: '1234 Waterloo St',
  description: 'A great place to dine!'
}

var createRestaurantWithValidRestaurantJsonFcn = 
  restaurantHelper.createRestaurant(mikuValidRestaurantJson, 201, 200);                    

loginHelper.testLoginUserPerformFcn(
  fixture.loginAsRestaurantOwnerMsg, 
  createRestaurantWithValidRestaurantJsonFcn,
  fixture.loginJsonAsRestaurantOwner1, 201);

