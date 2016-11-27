#!/usr/bin/env bash

sudo -u postgres psql -d food2go -c "DROP TABLE AppUser CASCADE"