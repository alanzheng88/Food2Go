#!/usr/bin/env bash

set -o verbose

DIR="${BASH_SOURCE%/*}"
if [[ ! -d "$DIR" ]]; then DIR="$PWD"; fi

. "$DIR/helper.sh"

restartBackendServer