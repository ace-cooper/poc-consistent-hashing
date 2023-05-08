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
  DB_CONN_PORT="6379"
fi

# ids="1 2 3"
baseName="redis_${mode}"
netName="${baseName}_net"
data="${PWD}/data/${mode}/redis"
image="redis:alpine"

for i in ${DB_CONN_PORT}; do
  if [ "${join}" != "" ]; then
    join="${join},"
    dockerNames="${dockerNames} "
    dockerPsNames="${dockerPsNames} "
  fi

	join="${join}${baseName}_${i}"
	dockerNames="${dockerNames}${baseName}_${i}"
	dockerPsNames="${dockerPsNames}-f name=${baseName}_${i}"
done


if [ "$(docker ps -a ${dockerPsNames} | grep -i redis)" == "" ]; then
  let runnig=0
else
  let runnig=-1
fi

function runDocker {
  name="${baseName}_$1"
  params=""

  if [ $runnig == 0 ]; then
    params="-p $1:6379"
  fi

  docker run -d --name="${name}" --hostname="${name}" --net="${netName}" $params ${image} redis-server

  let runnig="runnig + 1"
}


function start {
  if [ $runnig == 0 ]; then
    echo "++++++ starting $dockerNames ++++++"
    docker pull "${image}"
    docker network create -d bridge "${netName}" &> /dev/null

    for i in ${DB_CONN_PORT}; do
      runDocker "$i"
    done


    # docker exec -it ${baseName}_1 ./redis-cli
    echo -e "\nFor command console run:\n  docker exec -it ${baseName}_1 redis-cli\n"
  fi
}

function stop {
  echo "------ stoping $dockerNames ------"
  docker stop $dockerNames &> /dev/null
  docker rm -v $dockerNames &> /dev/null
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