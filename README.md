# Consistent Hashing Poc
It's only another proof of concept of consistent hashing algorithm. It's not a production ready code, it's just a simple code with study purposes to showcase how it works distributing data across a cluster of servers. Also, there is a pretty simple cache layer to show how to use consistent hashing to cache data.

Ps: It's not using a third party library to implement consistent hashing, it's just a simple implementation of the algorithm, and could be found in the file ./src/core/cache.ts

## Installation
  ### Step 1
     install docker
  ### Step 2
     install node
  ### Step 3
  ```bash
  $ ./bin/init.sh
  ```
  ### Step 4
  ```bash
  $ ./bin/start-containers.sh
  ```
  ### Step 5
  ```bash
  $ ./bin/db-migrate.sh
  ```

## Dev Steps
  ### Step 1
  ```bash
  $ ./bin/start-containers.sh
  ```
  ### Step 2
  ```bash
  Run > Start Debug (F11)
  ```
  or
  ```bash
  $ ./bin/start.sh
  ```
  or
  ```bash
  $ npm start
  ```