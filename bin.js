#!/usr/bin/env node
const analyzr = require('./index.js')

const argv = require('minimist')(process.argv.slice(2));
const moduleName = argv._[0]

const path = argv._.slice(1)

const showHelp = () => {
  console.log(`
    Usage: module-analyzr <module> <path> [options]

    Extract usage of passed module.
  `)
}

if (argv.h) {
  showHelp()
  return
}

console.log(analyzr(moduleName, path, {cwd: true}))