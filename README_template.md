This is the template for CMPT 470 projects, providing some basics for Vagrant and Virtualbox setups, with configuration by Chef.

Procedure for instantly viewing your reactjs code changes from localhost:10000
1. fork the newest version of alan's final project to your repo
2. go to the parent folder and do vagrant up
3. wait for it to install
4. Run "vagrant rsync-auto" to let vagrant watch your file changes
5. Make any changes to your reactjs code
6. localhost:10000 should refresh in a second