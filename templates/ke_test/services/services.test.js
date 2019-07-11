const request = require('supertest')
const {
  expect
} = require('chai')
const BASE_URL = 'http://registry.npmjs.com'

describe('接口测试：测试npm包接口', function () {
  it('ip-cli接口 /@qianxuemin/ip-cli 返回的res.body.name=="@qianxuemin/ip-cli"', function (done) {
    request(BASE_URL)
      .get('/@qianxuemin/ip-cli')
      .set('Content-Type', 'application/json') // set header内容
      .expect(200) // 断言希望得到返回http状态码
      .end(function (err, res) {
        // console.log(res.body) // 返回结果
        expect(res.body).to.be.an('object')
        expect(res.body.name).to.equal('@qianxuemin/ip-cli')
        done()
      })
  })
})
