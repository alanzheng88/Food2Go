#!/usr/bin/env bash

vagrant up --provision
echo "Starting rsync"
vagrant rsync-auto