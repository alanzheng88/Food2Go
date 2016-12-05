#!/usr/bin/env bash
sudo -u postgres psql -d food2go -c "TRUNCATE TABLE app_user, app_order, food, restaurant CASCADE" 2> /dev/null
sudo -u postgres psql -d food2go -c "ALTER SEQUENCE hibernate_sequence RESTART WITH 1" 2> /dev/null

