# SFU Food2Go

Usage Instructions:
1. If you are on Windows, run the following line before cloning the repo: git config —global core.autocrlf true
2. Call "vagrant up"
3. Go to localhost:11000

# Features

### Overview
- Restful Api
  - design using API first approach
  - API follows REST standards
  - authorization and authentication
- User Profiles
  - log in with basic authentication
- Food
  - browse
  - order
- Restaurants
  - browse
  - upload images (food, menu, etc)
- Point System

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
1. click on a few links
2. press the back button (notice that the url does not change)

### login
1. Click on User dropdown button
2. Click on Login button
3. Enter user name and password
4. Click Submit button
5. A post request is send with username, password and sessionid (check network)
6. Server response to be implemented

# Technical Details

- Database: Postgresql
- Backend: Play 1 Framework
- FrontEnd: ReactJs
- Webserver: Nginx
- CI: TeamCity (http://alanzheng.com:8080)
