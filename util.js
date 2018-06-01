const fs = require('fs');

/**
 * returns whether passed path is a directory
 * @param {string} path 
 */
exports.isDir = (path) => {  
  return fs.existsSync(path) && fs.statSync(path).isDirectory();
}

/**
 * returns whether passed file is js | jsx | tsx
 * @param {string} filePath 
 */
exports.isJs = (filePath) => {
  const extention = filePath.split('.').slice(-1)[0]
  return extention === 'js' || extention === 'jsx' || extention === 'tsx' || extention === 'ts' 
}