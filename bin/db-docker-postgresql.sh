#!/bin/bash

if [ "$_PRELUDE_" != "true" ]; then
  source "${PWD}/bin/prelude.sh"
fi

if [[ "$2" != "" ]]; then
  mode="$2"
else
  mode="dev"
fi

if [[ "$3" != "" ]]; then
  DB_CONN_PORT="$3"
else
  DB_CONN_PORT="5432"
fi

baseName="pg_${mode}"
netName="${baseName}_net"
data="${ROOT_FOLDER}/data/${mode}/pg"
image="postgres:latest"

#---------------------------------------#

if [ "$(docker ps -a -f name=${baseName} | grep -i pgres)" == "" ]; then
  let runnig=0
else
  let runnig=-1
fi

function runDocker {

  docker run -d --name="${baseName}" --hostname="${baseName}" --net="${netName}" -p $DB_CONN_PORT:5432 \
    -e POSTGRES_USER=root \
    -e POSTGRES_DB=defaultdb \
    -e POSTGRES_PASSWORD=xxxxxx \
    -v "${data}/${name}:/data/postgres" ${image}

}

function start {
  if [ $runnig == 0 ]; then
    echo "++++++ starting $baseName ++++++"
    docker pull "${image}"
    docker network create -d bridge "${netName}" &> /dev/null
    runDocker
  fi
}

function stop {
  echo "------ stoping $baseName ------"
  docker stop $baseName &> /dev/null
  docker rm -v $baseName &> /dev/null
}

if [ "$1" == "start" ]; then
  start
elif [ "$1" == "stop" ]; then
  stop
else
  if [ $runnig == 0 ]; then
    start
  else
    stop
  fi
fi
