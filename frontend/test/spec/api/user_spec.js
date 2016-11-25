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
  .after(function(err, res, body) {
    cookie = server.getCookie(res);
    frisby.create("Get Customer Information")
      .get( url + "/api/user" )
      .addHeaders(server.getHeaders(cookie))
      .expectStatus(200)
      .expectJSON({
        firstName: "Alan",
        lastName: "Zheng",
        email: "alanz@sfu.ca",
        password: "2225cffa53282cd1f2bc9819052ead4e2888346c778922f996521d6b332a49b2",
        role: "customer"
      })
      // .inspectRequest()
    .toss()
  })
.toss()

frisby.create("Log In As Restaurant Owner")
  .post( url + "/api/authenticate", {
    email: "billhe@sfu.ca",
    password: "password1"
  }, {json: true} )
  .expectStatus(201)
  .expectHeaderContains('content-type', 'application/json')
  .after(function(err, res, body) {
    cookie = server.getCookie(res);
    frisby.create("Get Restaurant Owner Information")
      .get( url + "/api/user" )
      .addHeaders(server.getHeaders(cookie))
      .expectStatus(200)
      .expectJSON({
        firstName: "Bill",
        lastName: "He",
        email: "billhe@sfu.ca",
        password: "2225cffa53282cd1f2bc9819052ead4e2888346c778922f996521d6b332a49b2",
        role: "restaurantOwner"
      })
      // .inspectRequest()
      .after(function(err, res, body) {
        frisby.create("Get Restaurant Information")
          .get ( url + "/api/user?query=restaurants" )
          .addHeaders(server.getHeaders(cookie))
          .expectStatus(200)
          .expectJSON([{
            "name":"Miku",
            "phoneNumber":"6041112222",
            "email":"miku@company.com",
            "address":"1234 Waterloo St",
            "description":"A great place to dine!",
            "restaurantOwner":{
              "firstName":"Bill",
              "lastName":"He",
              "email":"billhe@sfu.ca",
              "password":"2225cffa53282cd1f2bc9819052ead4e2888346c778922f996521d6b332a49b2",
              "role":"restaurantOwner"
            }
          }])
        .toss()
      })
    .toss()
  })
.toss()