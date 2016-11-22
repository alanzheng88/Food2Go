#!/usr/bin/env bash

psql -d food2go -c "DROP TABLE AppUser CASCADE"
