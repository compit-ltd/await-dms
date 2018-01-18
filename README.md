# await-dms [![NPM version](https://badge.fury.io/js/await-dms.svg)](https://npmjs.org/package/await-dms)

> A simple util for polling AWS DMS until a task is in a desired status

## Installation

```sh
$ npm i -g await-dms
```

## Usage

```sh
# Wait for default statuses in N. Virginia (us-east-1)
$ await-dms --task my-task-id

# Wait for task "my-task-id" in Ireland (eu-west-1)
$ await-dms --t my-task-id -r eu-west-1

# Wait for statuses starting, running
$ await-dms --t my-task-id -s starting,running

# Check every 3 seconds, bail after 2 hours
$ await-dms --t my-task-id -i 3 --timeout 7200
```


## License

MIT © [Eli Goldberg]()
