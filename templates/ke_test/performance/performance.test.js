const Benchmark = require('benchmark')
const suite = new Benchmark.Suite()

// 添加测试
suite.add('正则表达式的test方法', function () {
  /o/.test('Hello World!')
})
  .add('字符串的indexOf方法', function () {
    'Hello World!'.indexOf('o') > -1
  })
  // add listeners
  .on('cycle', function (event) {
    console.log(String(event.target))
  })
  .on('complete', function () {
    console.log('最快的方法是: ' + this.filter('fastest').map('name'))
  })
  // run async
  .run({
    'async': true
  })
