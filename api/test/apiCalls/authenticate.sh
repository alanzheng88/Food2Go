curl -v -H "Content-Type: application/json" --data "{'firstName':'alex', 'lastName':'gee', 'email':'az@sfu.ca', 'password':'password1', 'role':'customer'}" http://localhost:9000/api/user

curl -v -H "Content-Type: application/json" --data "{'sessionid': '1234567', 'email':'az@sfu.ca', 'password':'password1', 'role':'customer'}" http://localhost:9000/api/authenticate

curl -v -X GET -H "Content-Type: application/json" http://localhost:9000/api/authenticate?sessionid=1234567
