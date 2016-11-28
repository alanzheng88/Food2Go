vagrant ssh -c 'psql -d food2go -c "TRUNCATE TABLE AppUser CASCADE"'

echo "Create a new user"
curl -v -H "Content-Type: application/json" --data "{'firstName':'alan', 'lastName':'zhee', 'email':'az@sfu.ca', 'password':'password1', 'role':'customer'}" http://localhost:9000/api/user

echo "Log in with POST request"
curl -v -H "Content-Type: application/json" --user 'az@sfu.ca':'password1' http://localhost:9000/api/authenticate

echo "Check login status with GET request"
curl -v -X GET -H "Content-Type: application/json" http://localhost:9000/api/authenticate

echo "Log out and delete the session"
curl -v -X DELETE -H "Content-Type: application/json" http://localhost:9000/api/authenticate

echo "Verify that session no longer exist"
curl -v -X GET -H "Content-Type: application/json" http://localhost:9000/api/authenticate
