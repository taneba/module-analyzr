const fs = require('fs')
const glob = require('glob')
const path = require('path')
const isGlob = require('is-glob')
const colo = require('colo')
const { isDir, isJs } = require('./util')

const getIgnorePath = (ignorePath, complementPath) => {
  if (Array.isArray(ignorePath)) {
    return ignorePath.map(i => complementPath + i)
  } else {
    return complementPath + ignorePath
  }
}

/**
 * returns array of pathname
 * @param {string} targetPath
 * @param {object} options 
 */
module.exports = (targetPath, options) => {
  let files
  const complementPath = options.cwd ? process.cwd() + '/' : ''
  const ignorePattern = options.i ? ['node_modules/**'].concat(getIgnorePath(options.i, complementPath)) : 'node_modules/**'
  
  if (Array.isArray(targetPath) && targetPath.length > 1) {
    if(options.i) {
      console.log(colo.red('Warning: ignore option does not work with glob pattern. If you want, pass glob pattern as a string.'))
    }
    files = targetPath.map(targetPath => complementPath + targetPath)
  } else {
    const absolutePath = complementPath + targetPath
    if (isGlob(absolutePath)) {
      files = glob.sync(absolutePath, {ignore: ignorePattern})
    } else if (isDir(absolutePath)) {
      files = glob.sync(path.join(absolutePath, '/**/*.*'), {ignore: ignorePattern}).filter(isJs)
    } else {
      files = [absolutePath]
    }
  }

  return files
}

