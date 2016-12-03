curl -v -c cookies.txt -H "Content-Type: application/json" --user 'rmok@sfu.ca':'password1' http://localhost:9000/api/authenticate

curl -v -b cookies.txt -H "Content-Type: application/json" --data "{'name':'Legion', 'email':'hello@legion.ca', 'phoneNumber':'604-789-7890', 'address':'4567 Water Street, Vancouver BC', 'description':'Jazz Bar'}" http://localhost:9000/api/restaurants