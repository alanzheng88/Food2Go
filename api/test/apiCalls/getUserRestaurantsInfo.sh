echo "Assume azip@sfu.ca is already in the database"

echo "Log in"
curl -v -H "Content-Type: application/json" --user 'azip@sfu.ca':'password1' http://localhost:9000/api/authenticate

echo "Get restaurant information"
curl -v -X GET -H "Content-Type: application/json" "http://localhost:9000/api/user?query=restaurants"
