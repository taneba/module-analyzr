const fs = require('fs')
const parser = require('./parser')
const extractStatement = require('./extract-statement')
const getFiles = require('./get-files')

/**
 * return result of analyzation
 * @param {string} path - path to file / directory
 * @param {string} pkgName - target npm package name
 * @param {object} options - options
 */

module.exports = (pkgName, path, options) => {
  if (!options) options = {}
  let result = {
    importedModules: [],
    importedDefault: 0,
    importedWithNameSpace: 0
  }

  const files = getFiles(path, options)
  
  files.forEach(file => {
    const data = fs.readFileSync(file, 'utf8')
    const ast = parser(data, options)
    const importData = extractStatement(ast, pkgName)
    
    // TODO: extract to function
    if (importData.ImportDefaultSpecifier) {
      ++result.importedDefault
    }
    if (importData.ImportNamespaceSpecifier) {
      ++result.importedWithNameSpace
    }
    if (importData.ImportSpecifier.length > 0) {
      importData.ImportSpecifier.forEach(moduleName => {
        const targetModuleObj = result.importedModules.find(obj => obj.moduleName === moduleName)
        if (targetModuleObj) {
          ++targetModuleObj.usageAmount
        } else {
          result.importedModules.push({moduleName: moduleName, usageAmount: 1})
        }
      })
    }
  })  
  return result
}