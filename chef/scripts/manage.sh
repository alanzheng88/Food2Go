#!/usr/bin/env bash

set -o verbose

. "chef/scripts/deployfrontend.sh"
. "chef/scripts/restartserver.sh"
