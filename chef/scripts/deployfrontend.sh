#!/usr/bin/env bash

pushd frontend
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
apt-get install -y nodejs
/usr/bin/npm install -g npm webpack-cli webpack@latest;
/usr/bin/npm install
rm -f src/client.min.js
webpack
popd
