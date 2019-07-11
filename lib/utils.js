module.exports = {
  appHasPackageJson
}

const fs = require('fs')
const path = require('path')

function appHasPackageJson () {
  // 判断是否存在package.json
  const packageJsonPath = path.join(process.cwd(), 'package.json')

  return fs.existsSync(packageJsonPath)
}
