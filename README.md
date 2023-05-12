# Consistent Hashing Poc
It's only another proof of concept of consistent hashing algorithm, just a simple code with study purposes to showcase how it works distributing data across a cluster of servers. Also, there is a pretty simple cache layer to show how to use consistent hashing to cache data.

### It's not a production ready code!

Ps: I'm not using a third party library to implement consistent hashing. The simple implementation of the algorithm could be found in the file [./src/core/cache.ts](https://github.com/ace-cooper/poc-consistent-hashing/blob/main/src/core/cache.ts)

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

# License

MIT License

Copyright (c) 2023 Hugo Fagundes

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
