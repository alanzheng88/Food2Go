var frisby = require('frisby');
var server = require('../../lib/server');
var url = server.url;

var cookie = '';

frisby.create('Log In As Customer')
  .post( url + '/api/authenticate', {json: true} )
  .addHeaders({'Content-Type': 'application/json'})
  .auth('bb@sfu.ca', 'password1')
  .expectStatus(201)
  .expectHeaderContains('Content-Type', 'application/json')
.toss()

