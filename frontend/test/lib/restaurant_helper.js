var frisby = require('frisby');
var server = require('./server');
var url = server.url;

var helper = {

  createRestaurant: function(restaurantJson, statusCodeBefore, statusCodeAfter) {

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
  },

  getRestaurantOwnerInfoFcn: function(userInfoAsRestaurantOwner, restaurantInfoAsRestaurantOwner) {

    return function(err, res, body) {
      cookie = server.getCookie(res);
      frisby.create('Get Restaurant Owner Information')
        .get( url + '/api/user' )
        .addHeaders(server.getHeaders(cookie))
        .expectStatus(200)
        .expectJSON(userInfoAsRestaurantOwner)
        // .inspectRequest()
        .after(function(err, res, body) {
          frisby.create('Get Restaurant Information')
            .get ( url + '/api/user?query=restaurants' )
            .addHeaders(server.getHeaders(cookie))
            .expectStatus(200)
            .expectJSON('?', restaurantInfoAsRestaurantOwner)
          .toss()
        })
      .toss()
    }
  }

  
}

module.exports = helper;

