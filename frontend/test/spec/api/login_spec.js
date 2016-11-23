var frisby = require('frisby');
var server = require('../../lib/server');
console.log(server);
var url = server.url;

frisby.create("Log In As Customer And Get User Info")
  .post( url + "/api/authenticate", {
    email: "alanz@sfu.ca",
    password: "password1",
    sessionid: "1234567"
  }, {json: true} )
  .expectStatus(200)
  .expectHeaderContains('content-type', 'application/json')
  .after(function(err, res, body) {
    frisby.create("Get User Information")
      .get( url + "/api/user?sessionid=1234567" )
      .expectStatus(200)
      .expectJSON({
        firstName: "Alan",
        lastName: "Zheng",
        email: "alanz@sfu.ca",
        password: "2225cffa53282cd1f2bc9819052ead4e2888346c778922f996521d6b332a49b2",
        role: "customer"
      })
    .toss()
  })
.toss()

