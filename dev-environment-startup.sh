#!/usr/bin/env bash

echo "Starting vagrant provision"
vagrant up --provision
echo "Starting rsync"
vagrant rsync-auto
echo "Ending rsync"