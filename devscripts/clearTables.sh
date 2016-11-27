#!/usr/bin/env bash
sudo -u postgres psql -d food2go -c "TRUNCATE TABLE appuser CASCADE"
sudo -u postgres psql -d food2go -c "TRUNCATE TABLE appuser RESTART IDENTITY"