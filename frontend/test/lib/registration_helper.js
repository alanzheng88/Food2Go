var frisby = require('frisby');
var server = require('./server');
var loginHelper = require('./login_helper');
var url = server.url;

var helper = {

  registerUser: function(userJson, statusCodeBefore, statusCodeAfter) {

    frisby.create('Create a User')
      .post( url + '/api/users', 
            userJson, {json: true} )
      // .inspectRequest()
      .expectStatus(statusCodeBefore)
      .after(function(err, res, body) {
        var loginMsg = loginHelper.loginAsCustomerMsg;
        var fcn = null;
        var loginJson = { email: userJson.email, password: userJson.password };
        loginHelper.testLoginUserPerformFcn(loginMsg, fcn, loginJson, 201);
      })
    .toss()
  }
}

module.exports = helper;

