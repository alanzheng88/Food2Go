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
- CI: TeamCity (http://alanzheng.com:8080) -> log in as Guest
- Project Management: Gitlab and Mingle (https://equinox.mingle.thoughtworks.com/projects/cmpt_470/cards/grid?color_by=Priority&favorite_id=2&filters%5B%5D=%5BType%5D%5Bis%5D%5BStory%5D&group_by%5Blane%5D=Status&lanes=New%2CComplete%2CTesting%2CDevelopment&tab=Card+Wall) -- username: haifuy@sfu.ca | password: password-1
- Testing Framework: Postman, Frisby
- Test Runner: Jasmine-node
- Automated Tests: Unit tests and API Tests for serverside run on every build

# Features
- Restful Api
  - Design using API first approach
  - API follows REST standards
  - Authorization and authentication
  - clear separation between frontend and backend
- User
  - Log in with basic authentication
  - Cookie saved with session and has a timeout of 1 day.
  - Can set roles as customer or restaurant owner
  - Can change user info (including password)
- Food
  - Browse
  - Add to Cart
  - Review and Confirm Order
- Restaurants
  - browse
  - upload images (food, menu, etc)
- Point System
- Checkout system
  - Shopping Cart
  - Checkout
  - Add food to shopping cart  
- History
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
    Email: bb@sfu.ca |
    Password: password1 |
    Role: Customer
    
    Email: billhe@sfu.ca |
    Password: password1 |
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
10. Enter in your address, phone number and payment information and Click Place Order at the bottom

### Ordering Food By Food Selection
1. Click on Browse Food
2. Click on the food you want from the list
3. Click on Add to Cart
4. Notice the item number increase in Shopping Cart at top right
5. Register or Login as customer or restaurant owner if not done so.
6. Click on Shopping Cart link on the top right
7. Change the quantity and notice the price change
8. Click Checkout at the bottom
9. Enter in your address, phone number and payment information and Click Place Order at the bottom
10. Click on the Order to view order detail

### Ordering Foods from multiple restaurants
1. Click on Browse Food
2. Add Sashimi and Unagi to shopping cart
3. Click on Shopping Cart
4. Click on checkout
5. Enter in your address, phone number and payment information and Click Place Order at the bottom
6. Click on the user orders page to view order detail
7. Two orders are created for each restaurant.

### Social Network
1. Links to Facebook, Twitter, email available at bottom right

### History
1. click on a few links
2. press the back button (notice that the url does not change)


