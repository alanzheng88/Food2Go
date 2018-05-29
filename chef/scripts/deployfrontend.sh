#!/usr/bin/env bash

pushd frontend
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt-get install -y nodejs
/usr/bin/npm run preinstall
/usr/bin/npm install
webpack
popd
