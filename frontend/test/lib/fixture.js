var frisby = require('frisby');
var server = require('./server');
var url = server.url;

var helper = {

  // new user info
  registerJsonAsNewCustomer1: {
    firstName: "test_customer1", 
    lastName: "test_customer1", 
    email: "tc1@sfu.ca", 
    password: "password1", 
    role:"customer"
  },

  // log in and user info for customers
  loginJsonAsCustomer1: {
    email: 'bb@sfu.ca',
    password: 'password1'
  },
  userInfoAsCustomer1: {
    firstName: 'Bob',
    lastName: 'Blueberry',
    email: 'bb@sfu.ca',
    password: '2225cffa53282cd1f2bc9819052ead4e2888346c778922f996521d6b332a49b2',
    role: 'customer'
  },

  // log in and user info for restaurant owners
  loginJsonAsRestaurantOwner1: {
    email: 'azip@sfu.ca',
    password: 'password1'
  },
  userInfoAsRestaurantOwner1: {
    firstName: 'Alan',
    lastName: 'Zip',
    email: 'azip@sfu.ca',
    password: '2225cffa53282cd1f2bc9819052ead4e2888346c778922f996521d6b332a49b2',
    role: 'restaurantOwner'
  },

  // restaurnt info for restaurant owners
  restaurantInfoAsRestaurantOwner1: {
    'name':'Al Porto',
    'phoneNumber':'604-987-9876',
    'email':'hello@alporto.ca',
    'address':'300 Main Street, Vancouver BC',
    'description':'Italian Pasta',
    'restaurantOwner':{
      'firstName':'Alan',
      'lastName':'Zip',
      'email':'azip@sfu.ca',
      'password':'2225cffa53282cd1f2bc9819052ead4e2888346c778922f996521d6b332a49b2',
      'role':'restaurantOwner'
    }
  }

}

module.exports = helper;

