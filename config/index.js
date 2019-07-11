module.exports = {
  // 测试依赖项
  deps: {
    'scripts': {
      'ke_test:unit': 'mocha --require babel-core/register ke_test/unit/unit.test.js -w --reporter mochawesome --reporter-options reportDir=./report,reportFilename=unit',
      'ke_test:unit_cover': 'babel-node ./node_modules/.bin/babel-istanbul cover _mocha -- ke_test/unit/unit.test.js -R spec --recursive',
      'ke_test:services': 'mocha ke_test/services/services.test.js --reporter mochawesome --reporter-options reportDir=./report,reportFilename=services',
      'ke_test:e2e': 'mocha ke_test/e2e/e2e.test.js --reporter mochawesome --reporter-options reportDir=./report,reportFilename=e2e',
      'ke_test:auto': 'npm run ke_test:unit && npm run ke_test:services && npm run ke_test:e2e',
      'ke_test:performance': 'node ke_test/performance/performance.test.js '
    },
    'devDependencies': {
      'babel-core': '^6.26.3',
      'babel-istanbul': '^0.12.2',
      'babel-plugin-import': '^1.5.0',
      'babel-preset-es2015': '^6.24.1',
      'benchmark': '^2.1.4',
      'chai': '^4.2.0',
      'istanbul': '^0.4.5',
      'mocha': '^6.0.0',
      'mochawesome': '^3.1.1',
      'selenium-webdriver': '^4.0.0-alpha.1',
      'supertest': '^3.4.2'
    }
  },
  // 配置babelrc
  babelrc: {
    'presets': [
      'es2015'
    ]
  },
  // 测试用例
  testDemo: '',
  // 浏览器驱动
  chromeDriver: ''
}
