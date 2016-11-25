#!/usr/bin/env bash

set -o verbose

pushd api/
screen -d -m /home/downloads/play-1.4.3/play run --%dev
popd

pushd frontend/
npm install
screen -d -m /usr/bin/npm run dev
popd

echo "Warming up backend server"
curl -X GET -m 60 http://localhost:9000

