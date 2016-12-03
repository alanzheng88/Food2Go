#!/usr/bin/env bash

echo "Requires npm and jasmine-node to be installed on host"
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
pushd "$DIR/../frontend"
npm run test:live
popd
