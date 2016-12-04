# SFU Food2Go

# Usage Instructions:
1. If you are on Windows, run the following line before cloning the repo: git config —global core.autocrlf true
2. Call "vagrant up"
3. Go to localhost:11000

# Description: 
    In today's world, people can lead a hectic, always on-the-go lifestyle. 
    Food2Go is a website that offers people a convenient and time-saving way of getting diversified food.
    Often is the cases are when people are unable to enjoy a nice meal due to time constraint, inconvenience or even indecisiveness.
    Food2Go not only allows people to browse, search and review restauants, the website is allow the option of having the food delivered to them.
    Food2Go is partnered with the restaurants, helping the restaurateurs to spread awareness and generate revenues for their business.
    By adding the game-changing factor of delivery, we can save people's time by not letting them travel, wait in line and deal with a busy restaurant setting.
    

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
  - Cookie saved with session and has a timeout of 15 minutes
  - Can set roles as customer or restaurant owner
  - Can Reset password
- Food
  - Browse
  - Add to Cart
  - Review and Confirm Order
- Restaurants
  - Create
  - Browse
  - Upload images

Demo Instructions
Registration
1. Click on the Register Link on the top right of the website.
2. Enter in your information and selection your role either as customer or restaurant owner.
(Customer and restaurant owner will have different functionality)

Login
1. Click on the Login Link on the top right of the website.
2. Enter your email and password to login.
3. Some default users:
    Email: bb@sfu.ca
    Password: password1
    Role: Customer
    
    Email: billhe@sfu.ca
    Password: password1
    Role: Restaurant Owner

Profile Setting
1. When logged in, click on User -> My Account
2. View and update your account information
3. View your orders and points.

Creating a Restaurant 
1. Login as a restaurant owner
2. Click on create restaurant near the top
3. Enter restaurant information
4. Select images for the restaurant

Ordering Food
1. Login not required
2. Click on Restaurant link at the top or "Browse Restaurant" button at the homepage
3. Select a restaurant from the list
4. Click on Order Now
5. Select the food item you want to order and click "Select this item for shopping cart"
6. Once completed, Click on Shopping Cart link on the top right
7. Review the order and click Checkout at the bottom
8. Enter in your address and payment information and Click Place Order at the bottom

Social Network
1. Links to Facebook, Twitter, email available at bottom right

history
1. click on a few links
2. press the back button (notice that the url does not change)


