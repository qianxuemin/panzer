const { expect } = require('chai')
const { Builder, By, Key, until } = require('selenium-webdriver')
const chromeDriver = require('selenium-webdriver/chrome')

describe('e2e测试：测试打开npm', () => {
  let driver
  before(function () {
    // 在本区块的所有测试用例之前执行
    driver = new Builder()
      .forBrowser('chrome')
      // 设置无界面测试
      // .setChromeOptions(new chromeDriver.Options().addArguments(['headless']))
      .build()
  })
  describe('首页测试', function () {
    this.timeout(50000)
    it('获取页面title是否等于"@qianxuemin/ip-cli  -  npm"', async () => {
      await driver.get('https://www.npmjs.com/package/@qianxuemin/ip-cli')
      const currentTitle = await driver.getTitle()
      await driver.sleep(2000)
      expect(currentTitle).to.equal('@qianxuemin/ip-cli  -  npm')
    })
  })

  after(() => {
    // 在本区块的所有测试用例之后执行
    driver.quit()
  })
})
