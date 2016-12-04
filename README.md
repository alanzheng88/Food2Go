# SFU Food2Go

# Usage Instructions:
1. If you are on Windows, run the following line before cloning the repo: git config —global core.autocrlf true
2. Call "vagrant up"
3. Go to localhost:11000

# Description: 
    In today's world, people can lead a hectic, always on-the-go lifestyle. 
    Food2Go is a website that offers people a convenient and time-saving way 
    of getting diversified food. Often is the cases are when people are unable 
    to enjoy a nice meal due to time constraint, inconvenience or even 
    indecisiveness.
    Food2Go not only allows people to browse, search and review restaurants, 
    the website is allowed the option of having the food delivered to them.
    Food2Go is partnered with restaurants, helping the restaurateurs to 
    spread awareness and generate revenues for their business.
    By adding the game-changing factor of delivery, we can save people's time 
    by cutting out travel time, wait in line and deal with a busy restaurant 
    setting.
    

# Technical Details
- Database: Postgresql
- Backend: Play 1 Framework
- FrontEnd: ReactJs
- Webserver: Nginx
- CI: TeamCity (http://alanzheng.com:8080)

# Features
- Restful Api
  - Design using API first approach
  - API follows REST standards
  - Authorization and authentication
- User
  - Log in with basic authentication
  - Cookie saved with session and has a timeout of 1 day.
  - Can set roles as customer or restaurant owner
  - Can Reset password
- Food
  - Browse
  - Add to Cart
  - Review and Confirm Order
- Restaurants
  - browse
  - upload images (food, menu, etc)
- Point System
- checkout system
  - Shopping Cart
  - Checkout
  - Add food to shopping cart  
  

### restful api
- clear separation between frontend and backend

### registration
1. Go to http://localhost:9000 to manually warmup server url (for now)
2. Go to http://localhost:9000/api/users (note the list of default users)
3. Go to http://localhost:11000
4. Click Register button
5. Enter information (validation present -- frontend)
6. Press submit button
7. Pop up shows successful registration
8. Go to http://localhost:9000/api/users (verify user has been created)

### history
  - Create
  - Browse
  - Retrieve images

# Demo Instructions
Registration
1. Click on the Register Link on the top right of the website.
2. Enter in your information and select your roles, either as a customer or a restaurant owner.
    (Customer and restaurant owner will have different functionalities)

### Login
1. Click on the Login Link on the top right of the website.
2. Enter your email and password to login.
3. Some default users:
    Email: bb@sfu.ca
    Password: password1
    Role: Customer
    
    Email: billhe@sfu.ca
    Password: password1
    Role: Restaurant Owner

### Profile Setting
1. When logged in, click on User -> My Account
2. View and update your account information
3. View your orders and points.

### Creating a Restaurant 
1. Login as a restaurant owner
2. Click on create restaurant near the top
3. Enter restaurant information
4. Select images for the restaurant
5. Click on Create Restaurant

### Ordering Food From A Restaurant
1. Click on Restaurant link at the top or "Browse Restaurant" button at the homepage
2. Select a restaurant from the list
3. Click on Order Now
4. Select the food item you want to order by clicking "Select item" below the item picture to add to shopping cart
5. Notice the item number increase in Shopping Cart at top right
6. Once completed, Click on Shopping Cart link on the top right
7. Register or Login as customer or restaurant owner if not done so.
8. Click on Shopping Cart link on the top right
9. Review the order and click Checkout at the bottom
10. Enter in your address and payment information and Click Place Order at the bottom

### Ordering Food By Food Selection
1. Click on Browse Food
2. Click on the food you want from the list
3. Click on Add to Cart
4. Notice the item number increase in Shopping Cart at top right
5. Register or Login as customer or restaurant owner if not done so.
6. Click on Shopping Cart link on the top right
7. Change the quantity and notice the price change
8. Click Checkout at the bottom
9. Enter in your address and payment information and Click Place Order at the bottom
10. Click on the Order to view order detail

### Social Network
1. Links to Facebook, Twitter, email available at bottom right

### History
1. click on a few links
2. press the back button (notice that the url does not change)


