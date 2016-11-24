#!/usr/bin/env bash

# Install Java
if ! command -v java >/dev/null 2>&1; then
  apt-get install -y software-properties-common python-software-properties
  echo oracle-java8-installer shared/accepted-oracle-license-v1-1 select true | /usr/bin/debconf-set-selections
  add-apt-repository ppa:webupd8team/java -y
  apt-get update
  apt-get install oracle-java8-installer
  echo "Setting environment variables for Java 8.."
  apt-get install -y oracle-java8-set-default --allow-unauthenticated
fi
