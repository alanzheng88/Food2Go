vagrant ssh -c 'psql -d food2go -c "TRUNCATE TABLE AppUser"'

echo "Create a new user"
curl -v -H "Content-Type: application/json" --data "{'firstName':'alex', 'lastName':'gee', 'email':'az@sfu.ca', 'password':'password1', 'role':'customer'}" http://localhost:9000/api/user

echo "Login with POST request"
curl -v -H "Content-Type: application/json" --data "{'sessionid': '1234567', 'email':'az@sfu.ca', 'password':'password1', 'role':'customer'}" http://localhost:9000/api/authenticate

echo "Get user info with session id"
curl -v -X GET -H "Content-Type: application/json" "http://localhost:9000/api/user?sessionid=1234567"
