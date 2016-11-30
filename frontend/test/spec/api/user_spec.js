var frisby = require('frisby');
var server = require('../../lib/server');
var url = server.url;

var cookie = '';

frisby.create('Log In As Customer')
  .post( url + '/api/authenticate', {json: true} )
  .auth('bb@sfu.ca', 'password1', false)
  .addHeaders({'Content-Type': 'application/json'})
  // .inspectRequest()
  .expectStatus(201)
  .expectHeaderContains('Content-Type', 'application/json')
  .after(function(err, res, body) {
    cookie = server.getCookie(res);
    frisby.create('Get Customer Information')
      .get( url + '/api/user' )
      .addHeaders(server.getHeaders(cookie))
      .expectStatus(200)
      .expectJSON({
        firstName: 'Bob',
        lastName: 'Blueberry',
        email: 'bb@sfu.ca',
        password: '2225cffa53282cd1f2bc9819052ead4e2888346c778922f996521d6b332a49b2',
        role: 'customer'
      })
      // .inspectRequest()
    .toss()
  })
.toss()

frisby.create('Log In As Restaurant Owner')
  .post( url + '/api/authenticate', {json: true} )
  .auth('azip@sfu.ca', 'password1')
  .expectStatus(201)
  .expectHeaderContains('Content-Type', 'application/json')
  .after(function(err, res, body) {
    cookie = server.getCookie(res);
    frisby.create('Get Restaurant Owner Information')
      .get( url + '/api/user' )
      .addHeaders(server.getHeaders(cookie))
      .expectStatus(200)
      .expectJSON({
        firstName: 'Alan',
        lastName: 'Zip',
        email: 'azip@sfu.ca',
        password: '2225cffa53282cd1f2bc9819052ead4e2888346c778922f996521d6b332a49b2',
        role: 'restaurantOwner'
      })
      // .inspectRequest()
      .after(function(err, res, body) {
        frisby.create('Get Restaurant Information')
          .get ( url + '/api/user?query=restaurants' )
          .addHeaders(server.getHeaders(cookie))
          .expectStatus(200)
          .expectJSON('?', {
            'name':'Al Porto',
            'phoneNumber':'604-987-9876',
            'email':'hello@alporto.ca',
            'address':'300 Main Street, Vancouver BC',
            'description':'Italian Pasta',
            'restaurantOwner':{
              'firstName':'Alan',
              'lastName':'Zip',
              'email':'azip@sfu.ca',
              'password':'2225cffa53282cd1f2bc9819052ead4e2888346c778922f996521d6b332a49b2',
              'role':'restaurantOwner'
            }
          })
        .toss()
      })
    .toss()
  })
.toss()