#!/bin/bash

source "${PWD}/bin/prelude.sh"

rm -rf $ROOT_FOLDER/prisma/migrations $ROOT_FOLDER/package-lock.json $ROOT_FOLDER/node_modules $ROOT_FOLDER/data/* $ROOT_FOLDER/dist $ROOT_FOLDER/.env $ROOT_FOLDER/.env.test