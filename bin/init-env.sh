#!/bin/bash

if [ "$_PRELUDE_" != "true" ]; then
  source "${PWD}/bin/prelude.sh"
fi

if [[ ! -f "$ROOT_FOLDER/.env" ]]; then
    echo "export DB_PORT=26257" >> $ROOT_FOLDER/.env
    echo "export CACHE_PORTS=\"6379 6380 6381\"" >> $ROOT_FOLDER/.env
    echo "export DATABASE_URL=\"postgresql://root:xxxxxx@localhost:26257/defaultdb\"" >> $ROOT_FOLDER/.env
    echo "export CACHE_URL=[\"redis://localhost:6379\",\"redis://localhost:6380\",\"redis://localhost:6381\"]" >> $ROOT_FOLDER/.env
fi

# if [[ ! -f "$ROOT_FOLDER/.env.test" ]]; then
#     echo "export DB_PORT=26258" >> $ROOT_FOLDER/.env.test
#     echo "export DATABASE_URL=\"postgresql://root:xxxxxx@localhost:26258/defaultdb\"" >> $ROOT_FOLDER/.env.test
#     echo "export CACHE_URL=[\"redis://localhost:6479\",\"redis://localhost:6480\",\"redis://localhost:6481\"]" >> $ROOT_FOLDER/.env.test
# fi