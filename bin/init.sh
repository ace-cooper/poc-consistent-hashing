#!/bin/bash

if [ "$_PRELUDE_" != "true" ]; then
  source "${PWD}/bin/prelude.sh"
fi

rm -rf $ROOT_FOLDER/node_modules $ROOT_FOLDER/data $ROOT_FOLDER/dist

echo "Creating docker data folders"
mkdir -p $ROOT_FOLDER/data/dev/pg
mkdir -p $ROOT_FOLDER/data/test/pg

echo "Creating .env files"

bash $ROOT_FOLDER/bin/init-env.sh

echo "Init modules"

npm i