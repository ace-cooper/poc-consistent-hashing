#!/bin/bash

if [ "$_PRELUDE_" != "true" ]; then
  source "${PWD}/bin/prelude.sh"
fi

# rm -rf $ROOT_FOLDER/node_modules $ROOT_FOLDER/data $ROOT_FOLDER/dist

bash $ROOT_FOLDER/bin/prune-all.sh

echo "Creating docker data folders"
mkdir -p $ROOT_FOLDER/data/dev/pg $ROOT_FOLDER/data/dev/redis
mkdir -p $ROOT_FOLDER/data/test/pg $ROOT_FOLDER/data/test/redis

echo "Creating .env files"

bash $ROOT_FOLDER/bin/init-env.sh

echo "Init modules"

npm i