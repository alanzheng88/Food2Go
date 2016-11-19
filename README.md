# SFU Food2Go

Usage Instructions:
1. Call "vagrant up"
2. Go to localhost:11000

# Features

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

# Technical Details

- Database: Postgresql
- Backend: Play 1 Framework
- FrontEnd: ReactJs
- Webserver: Nginx
- CI: TeamCity (http://alanzheng.com:8080)
