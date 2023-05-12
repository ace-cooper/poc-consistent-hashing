#!/usr/bin/env bash
source "${PWD}/bin/prelude.sh"

if [[ "$2" != "" ]]; then
  mode="$2"
  source $ROOT_FOLDER/.env.$mode
else
  mode="dev"
  source $ROOT_FOLDER/.env
fi

$ROOT_FOLDER/bin/db-docker-postgresql.sh stop
$ROOT_FOLDER/bin/db-docker-postgresql.sh stop test

$ROOT_FOLDER/bin/docker-redis.sh stop dev "$CACHE_PORTS"
$ROOT_FOLDER/bin/docker-redis.sh stop test "$CACHE_PORTS"