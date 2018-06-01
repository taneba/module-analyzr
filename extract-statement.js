'use strict'
const { flatten } = require('lodash')

/**
 * returns array of used modules
 * { 
 *    namedModules: ['moduleA', 'moduleB'],
 *    defaultExports: true,
 *    entireModule: true,
 * }
 * @param {object} ast
 * @param {string} pkgName
 */
module.exports = (ast, pkgName) => {
  const importDeclarations = 
    ast.program.body
    .filter(node => node.type === 'ImportDeclaration')
    .filter(node => node.source.value === pkgName)

  const specifiers = flatten(importDeclarations.map(node => node.specifiers.map(specifier => specifier)))

  return {
    ImportSpecifier: specifiers.filter(specifier => specifier.type === 'ImportSpecifier').map(specifier => specifier.imported.name),
    ImportDefaultSpecifier: specifiers.some(specifier => specifier.type === 'ImportDefaultSpecifier'),
    ImportNamespaceSpecifier: specifiers.some(specifier => specifier.type === 'ImportNamespaceSpecifier')
  }
}