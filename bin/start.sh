#!/bin/bash

if [ "$_PRELUDE_" != "true" ]; then
  source "${PWD}/bin/prelude.sh"
fi

if [[ "$2" != "" ]]; then
  mode="$2"
  source $ROOT_FOLDER/.env.$mode
else
  mode="dev"
  source $ROOT_FOLDER/.env
fi

npx ts-node $ROOT_FOLDER/servers/http/http-server.ts