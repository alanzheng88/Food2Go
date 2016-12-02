var frisby = require('frisby');
var server = require('./server');
var url = server.url;

var helper = {

  // messages
  loginAsCustomerMsg: 'Log In As Customer',
  loginAsRestaurantOwnerMsg: 'Log In As Restaurant Owner',

  // helper functions
  testLoginUserPerformFcn: function(loginMsg, fcn, loginJson, statusCode) {

    var loginAuthenticate = frisby.create(loginMsg)
      .post( url + '/api/authenticate', {json: true} )
      .addHeaders({'Content-Type': 'application/json'})
      .auth(loginJson.email, loginJson.password)
      .expectStatus(statusCode)
      .expectHeaderContains('Content-Type', 'application/json')
    
    if (fcn != null) {
      loginAuthenticate.after(fcn)
    }

    loginAuthenticate.toss();
  }
}

module.exports = helper;