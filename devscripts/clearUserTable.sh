#!/usr/bin/env bash

psql -d food2go -c "TRUNCATE TABLE AppUser"
