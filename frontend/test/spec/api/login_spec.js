var frisby = require('frisby');
var server = require('../../lib/server');
var url = server.url;

var cookie = "";

frisby.create("Log In As Customer")
  .post( url + "/api/authenticate", {
    email: "alanz@sfu.ca",
    password: "password1"
  }, {json: true} )
  .expectStatus(201)
  .expectHeaderContains('content-type', 'application/json')
.toss()

