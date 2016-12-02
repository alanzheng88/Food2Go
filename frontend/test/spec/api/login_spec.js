var frisby = require('frisby');
var loginHelper = require('../../lib/login_helper');
var fixture = require('../../lib/fixture');
var userInfoHelper = require('../../lib/user_info_helper');

var fcn = userInfoHelper.getCustomerInfoFcn(fixture.loginJsonAsCustomer1, 200);
loginHelper.testLoginUserPerformFcn(fixture.loginAsCustomerMsg, getCustomerInfoFcn, 
                                    fixture.loginJsonAsCustomer1, 201);