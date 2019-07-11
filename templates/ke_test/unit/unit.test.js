// 你可以import待测试的方法 示例： import { sum } from '../util.js'
const sum = (a, b) => (a + b)
const { expect, should, assert } = require('chai')
should()

describe('测试 sum 方法', function () {
  // 生命周期
  before(function () {}) // 在本区块的所有测试用例之前执行
  after(function () {}) // 在本区块的所有测试用例之后执行
  beforeEach(function () {}) // 在本区块的每个测试用例之前执行
  afterEach(function () {}) // 在本区块的每个测试用例之后执行

  // 同步测试
  it('1 加 1 应该等于 2', function () {
    // 兼容不同风格断言
    expect(sum(1, 1)).to.be.equal(2)
    sum(1, 1).should.equal(2)
    assert.equal(sum(1, 1), 2)
  })

  // 异步测试
  it('测试应该1000毫秒后结束', function (done) {
    let x = true
    let f = function () {
      x = false
      expect(x).to.be.not.ok
      done() // 通知Mocha测试结束
    }
    setTimeout(f, 1000)
  })
})
