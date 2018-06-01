const fs = require('fs')
const glob = require('glob')
const path = require('path')
const isGlob = require('is-glob')
const { isDir, isJs } = require('./util')

/**
 * returns array of pathname
 * @param {string} targetPath
 * @param {object} options 
 */
module.exports = (targetPath, options) => {
  let files
  const complementPath = options.cwd ? process.cwd() + '/' : ''
  
  if (Array.isArray(targetPath) && targetPath.length > 1) {
    files = targetPath.map(targetPath => complementPath + targetPath)
  } else {
    const absolutePath = complementPath + targetPath
    if (isGlob(absolutePath)) {
      files = glob.sync(absolutePath, {ignore: 'node_modules/**'})
    } else if (isDir(absolutePath)) {
      files = glob.sync(path.join(absolutePath, '/**/*.*'), {ignore: 'node_modules/**'}).filter(isJs)
    } else {
      files = [absolutePath]
    }
  }

  return files
}