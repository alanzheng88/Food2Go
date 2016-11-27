var frisby = require('frisby');
var server = require('../../lib/server');
var url = server.url;

var cookie = '';

var testLoginUserWithRestaurant = function(restaurantFcn, loginJson,
                                       statusCode) {
  frisby.create('Log In As Customer')
    .post( url + '/api/authenticate', {json: true} )
    .addHeaders({'Content-Type': 'application/json'})
    .auth(loginJson.email, loginJson.password)
    .expectStatus(statusCode)
    .expectHeaderContains('Content-Type', 'application/json')
    .after(restaurantFcn)
  .toss()
}

var createRestaurant = function(restaurantJson, statusCodeBefore, statusCodeAfter) {

  return function(err, res, body) {
          cookie = server.getCookie(res);
          frisby.create('Create a Restaurant')
            .post( url + '/api/restaurants', 
                  restaurantJson, {json: true} )
            .addHeaders(server.getHeaders(cookie))
            // .inspectRequest()
            .expectStatus(statusCodeBefore)
            .after(function(err, res, body) {
              frisby.create('Get Created Restaurant')
                .get( url + '/api/restaurants' )
                .addHeaders(server.getHeaders(cookie))
                .expectHeaderContains('Content-Type', 'application/json')
                .expectJSON('?', restaurantJson)
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
  password: 'password1'
}

testLoginUserWithRestaurant(
  createRestaurant(mikuValidRestaurantJson, 201, 200), 
  billHeLoginJson, 201
);

