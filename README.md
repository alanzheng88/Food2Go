# SFU Food2Go

Usage Instructions:
1. Call "vagrant up"
2. Go to localhost:11000

# Procedure for instantly viewing your ReactJs code changes from localhost:10000
1. fork the newest version of alan's final project to your repo
2. go to the parent folder and do vagrant up
3. wait for it to install
4. Run "vagrant rsync-auto" to let vagrant watch your file changes
5. Make any changes to your ReactJs code
6. localhost:10000 should refresh in a second

# Technical Details

- Database: Postgresql
- Backend: Play 1 Framework
- FrontEnd: ReactJs
- Webserver: Nginx
- CI: TeamCity