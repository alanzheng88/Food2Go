var frisby = require('frisby');
var server = require('../../lib/server');
var url = server.url;
var sessionid = server.randSessionId();


var testLoginWithRestaurant = function(restaurantFcn, loginJson,
                                       statusCode) {
  frisby.create('Log In As Customer')
    .post( url + '/api/authenticate', loginJson, {json: true} )
    .expectStatus(statusCode)
    .expectHeaderContains('content-type', 'application/json')
    .after(restaurantFcn)
  .toss()
}

var createRestaurant = function(jsonBefore, statusCodeBefore,
                                jsonAfter, statusCodeAfter) {

  return function(err, res, body) {
          frisby.create('Create a Restaurant')
            .post( url + '/api/restaurants?sessionid=' + sessionid, 
                  jsonBefore, {json: true} )
            .expectStatus(statusCodeBefore)
            .after(function(err, res, body) {
              frisby.create('Get Created Restaurant')
                .get( url + '/api/restaurants')
                .expectHeaderContains('content-type', 'application/json')
                .expectJSON( '?', jsonAfter)
                .expectStatus(statusCodeAfter)
              .toss()
            })
          .toss()
        }
}

var mikuValidRestaurantJson = {
  name: 'Miku',
  phoneNumber: '6041112222',
  email: 'miku@company.com',
  address: '1234 Waterloo St',
  description: 'A great place to dine!'
}

var billHeLoginJson = {
  email: 'billhe@sfu.ca',
  password: 'password1',
  sessionid: sessionid
}

testLoginWithRestaurant(createRestaurant(
  mikuValidRestaurantJson, 201,
  mikuValidRestaurantJson, 200
), billHeLoginJson, 200);

