[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![Build and test](https://github.com/lukaskwkw/quicksearx/actions/workflows/test.yml/badge.svg)](https://github.com/lukaskwkw/quicksearx/actions/workflows/test.yml)
# Quicksearx WIP
## Requirements
NodeJS 18.x

## Installation
### A. using npm
```sh
npx pnpm install && cd web && npx pnpm install
```
then build
```sh
export NODE_OPTIONS=--openssl-legacy-provider   
npm run build
```

### B. using docker
```sh
docker build -t quicksearx -f Dockerfile .
```

or if you already build using npm then you can use the following command to make docker build faster

```sh
docker build -t quicksearx -f build.Dockerfile .
```

## Running
### A. using npm

```sh
npm run start:prod
```

### B. using docker

```sh
docker run --restart unless-stopped --name quicksearx -d -ti -p 9000:9000 quicksearx
```

## Features

* If search results < 3 then retry search against another searx instance (search max 3 times)
* Every instance that search result fails/retrieve small amount of results will be temporarily removed from next drawing ( in future there will be ranking of instances instead )
* Cache the results from https://searx.space/data/instances.json for 1h time to speed up finall search results
* Possibility to add as search engine to Firefox
* Currently filtering instances is hardcoded and only supports [C, V] in future there will be more filtering on Frontend side like filter by version, search timings etc.
* Frontend is WIP

### Inspired by [gimmeasearx](https://github.com/demostanis/gimmeasearx)

### Licensed under GPLv3.