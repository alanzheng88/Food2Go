git checkout prod -- chef/cookbooks/baseconfig/files/default/nginx-default
git checkout prod -- chef/scripts/*
git commit -m "prepstaging.sh -- prep files for prod"
