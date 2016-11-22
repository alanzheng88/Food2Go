echo "Assume azip@sfu.ca is already in the database"

echo "Log in with session id"
curl -v -H "Content-Type: application/json" --data "{'sessionid': '1234567', 'email':'azip@sfu.ca', 'password':'password1'}" http://localhost:9000/api/authenticate

echo "Get restaurant information"
curl -v -X GET -H "Content-Type: application/json" "http://localhost:9000/api/user?sessionid=1234567&query=restaurants"
