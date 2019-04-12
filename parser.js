'use strict'
const babylon = require('@babel/parser')

/**
 * returns ast parsed by babylon
 * @param {string} code 
 */
module.exports = (code, options) => {
  const plugins = [
    "jsx",
    "objectRestSpread",
    "classProperties",
    "flowComments",
    "dynamicImport"
  ]
  if(options.type === 'flow'){
    plugins.unshift('flow')
  }
  if(options.type === 'typescript') {
    plugins.unshift('typescript')
  }
  return babylon.parse(code, {
    sourceType: "module",
    plugins: plugins 
  })
}
