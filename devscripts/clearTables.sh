#!/usr/bin/env bash
sudo -u postgres psql -d food2go -c "TRUNCATE TABLE appuser, restaurant CASCADE"
sudo -u postgres psql -d food2go -c "ALTER SEQUENCE hibernate_sequence RESTART WITH 1"
