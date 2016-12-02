var frisby = require('frisby');
var server = require('../../lib/server');
var registerHelper = require('../../lib/registration_helper');
var fixture = require('../../lib/fixture');
var url = server.url;

registerHelper.registerUser(fixture.registerJsonAsNewCustomer1, 201, 200);
