#!/usr/bin/env node
const analyzr = require('./index.js')

const argv = require('minimist')(process.argv.slice(2));
const moduleName = argv._[0]

const path = argv._.slice(1)

const showHelp = () => {
  console.log(`
    Usage: module-analyzr <moduleName> <path> [options]

      moduleName    A name of module.
      path          File path or directory path or glob pattern

    Options:
      -i   File path or directory path or glob pattern to ignore. Default: [node_modules]
  `)
}

if (argv.h) {
  showHelp()
  return
}

console.log(analyzr(moduleName, path, {cwd: true, i: argv.i}))