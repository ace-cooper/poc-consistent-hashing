#!/usr/bin/env bash
source "${PWD}/bin/prelude.sh"

$ROOT_FOLDER/bin/db-docker-postgresql.sh stop
$ROOT_FOLDER/bin/db-docker-postgresql.sh stop test
