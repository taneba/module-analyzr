'use strict'
const babylon = require('@babel/parser')

/**
 * returns ast parsed by babylon
 * @param {string} code 
 */
module.exports = code => {
  return babylon.parse(code, {
    sourceType: "module",

    plugins: [
      // enable jsx and flow syntax
      "jsx",
      "flow",
      "objectRestSpread",
      "classProperties",
      "flowComments",
      "dynamicImport"
    ]  })
}