var frisby = require('frisby');

frisby.create('Get Google')
  .get('http://google.ca')
  .expectStatus(200)
.toss();
