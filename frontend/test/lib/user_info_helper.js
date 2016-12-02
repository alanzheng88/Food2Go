var frisby = require('frisby');
var server = require('./server');
var url = server.url;

var helper = {

  getCustomerInfoFcn: function(userJson, statusCode) {

    return function(err, res, body) {
      cookie = server.getCookie(res);
      delete userJson.password;
      frisby.create('Get Customer Information')
        .get( url + '/api/user' )
        .addHeaders(server.getHeaders(cookie))
        .expectStatus(statusCode)
        .expectJSON(userJson)
        // .inspectRequest()
      .toss()
    }
  }
}

module.exports = helper;