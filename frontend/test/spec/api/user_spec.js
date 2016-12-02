var frisby = require('frisby');
var server = require('../../lib/server');
var loginHelper = require('../../lib/login_helper');
var userInfoHelper = require('../../lib/user_info_helper');
var restaurantHelper = require('../../lib/restaurant_helper');
var fixture = require('../../lib/fixture');
var url = server.url;

var cookie = '';

var getCustomerInfoFcn = function(err, res, body) {
  cookie = server.getCookie(res);
  frisby.create('Get Customer Information')
    .get( url + '/api/user' )
    .addHeaders(server.getHeaders(cookie))
    .expectStatus(200)
    .expectJSON(fixture.userInfoAsCustomer1)
    // .inspectRequest()
  .toss()
}

loginHelper.testLoginUserPerformFcn(loginHelper.loginAsCustomerMsg, 
                                    getCustomerInfoFcn, 
                                    fixture.loginJsonAsCustomer1, 201);

var restaurantOwner1InfoFcn = restaurantHelper.getRestaurantOwnerInfoFcn(
                                  fixture.userInfoAsRestaurantOwner1, 
                                  fixture.restaurantInfoAsRestaurantOwner1);
loginHelper.testLoginUserPerformFcn(loginHelper.loginAsRestaurantOwnerMsg, 
                                    restaurantOwner1InfoFcn, 
                                    fixture.loginJsonAsRestaurantOwner1, 201);
