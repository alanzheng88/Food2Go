#!/usr/bin/env bash

pushd frontend
/usr/bin/npm install -g webpack
/usr/bin/npm install
webpack
popd
