#!/usr/bin/env node

const program = require('commander')
const shell = require('shelljs')
const _ = require('lodash')
const path = require('path')
const fs = require('fs')
const fse = require('fs-extra')
const mkdirpSync = fse.mkdirpSync
const log = console.log

const { appHasPackageJson } = require('../lib/utils')
const logger = require('../lib/logger')
const config = require('../config')

let showHelp = true

program
  .version(require('../package.json').version)
  .usage('<command>')
  .command('init')
  .description('初始化基于mocha的自动化测试方案')
// .option('-a, --add [testType]', '添加自动化一个自动化测试方案')
  .action(function (cmd) {
    showHelp = false
    buildTestScheme()
  })

program
  .command('detail')
  .description('描述命令行工具为你做了哪些事情')
// .option('-a, --add [testType]', '添加自动化一个自动化测试方案')
  .action(function (cmd) {
    showHelp = false
    showHowToDo()
  })

program.parse(process.argv)

if (showHelp === true) {
  consoleLogo()
  program.help()
}

/**
 * @method buildTestScheme 配置测试方案
 * @param { String } addType 新增的测试类型
 */
function buildTestScheme () {
  const packageJsonPath = path.join(process.cwd(), 'package.json')

  if (fs.existsSync(packageJsonPath)) {
    const pkg = require(packageJsonPath)
    const hasMocha = (pkg.devDependencies && pkg.devDependencies.mocha) || (pkg.dependencies && pkg.dependencies.mocha)

    if (hasMocha) {
      logger.error('  检测到你的项目中已经有了Mocha测试方案，我不会再给你配置一遍~')
    } else {
      writeDependencies()
      npmInstall()
      writeBabelRc()
      copyTestDemoAndChromeDriver()
    }
  } else {
    logger.error('  当前项目没有package.json,我不给你配置测试方案')
  }
}

function npmInstall () {
  const dep = config.deps.devDependencies
  const depStr = Object.keys(dep).join(' ')
  logger.success(`正在安装测试依赖:`)
  log(`  `, depStr)
  shell.exec(`npm install ${depStr} --save-dev`)

  // TODO 依赖安装了但是没有写到pkgJson中
}

function writeDependencies () {
  const packageJsonPath = path.join(process.cwd(), 'package.json')
  const pkgJson = require(packageJsonPath)
  _.merge(pkgJson, config.deps)
  // 格式化写入json
  fs.writeFileSync(packageJsonPath, JSON.stringify(pkgJson, null, '\t'))
}

function writeBabelRc () {
  const babelrcPath = path.join(process.cwd(), '.babelrc')
  let babelrcObj
  if (fs.existsSync(babelrcPath)) {
    // 有则合并
    const baseBabelrc = fs.readFileSync(babelrcPath, 'utf-8')
    // log('项目中的babelrc==', baseBabelrc)
    const baseBabelrcObj = JSON.parse(baseBabelrc)
    babelrcObj = _.merge(baseBabelrcObj, config.babelrc)
    // log('新的babelrc==', babelrcObj)
  } else {
    // 没有则创建babelrc
    babelrcObj = config.babelrc
    // log('创建的babelrc==', babelrcObj)
  }
  fs.writeFileSync(babelrcPath, JSON.stringify(babelrcObj, null, '\t'))
}

function copyTestDemoAndChromeDriver () {
  // 将 test文件夹和驱动拷贝到项目根目录
  const testPath = path.join(process.cwd(), 'ke_test')
  if (fs.existsSync(testPath)) {
    logger.error('  已经存在ke_test文件夹,不给你创建')
  } else {
    // 没有babelrc则创建
    // mkdirpSync(testPath)
    fse.copySync(path.resolve(__dirname, `../templates`), process.cwd())
    logger.success(`  自动化测试方案配置成功  🎉  🎉  🎉  `)
  }
}

function consoleLogo () {
  logger.success(`
  ██████╗  █████╗ ███╗   ██╗███████╗███████╗██████╗ 
  ██╔══██╗██╔══██╗████╗  ██║╚══███╔╝██╔════╝██╔══██╗
  ██████╔╝███████║██╔██╗ ██║  ███╔╝ █████╗  ██████╔╝
  ██╔═══╝ ██╔══██║██║╚██╗██║ ███╔╝  ██╔══╝  ██╔══██╗
  ██║     ██║  ██║██║ ╚████║███████╗███████╗██║  ██║
  ╚═╝     ╚═╝  ╚═╝╚═╝  ╚═══╝╚══════╝╚══════╝╚═╝  ╚═╝

  ──────  by qianxuemin                                                                        
                                    `)
}

function showHowToDo () {
  logger.success(`
    我帮你做了这么几件事：
        1.检测项目中有没有package.json， 没有的话不配置测试方案
        2.检测package.json中有没有mocha，没有则为你配置测试方案
        3.补充devDependencies
        4.补充npmScript
        4.补充.babelrc
        5.补充testDemo
        6.下载浏览器驱动，若驱动版本不匹配的话可以自行下载替换(地址：http://chromedriver.storage.googleapis.com/index.html)
        `)
}
