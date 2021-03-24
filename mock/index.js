const fs = require('fs')
const path = require('path')
const root = process.cwd()
const mocks = path.join(root, './mock/json')
const mocksJs = path.join(root, './mock/js')

let allMocks = fs.readdirSync(mocks)
// 动态mock数据
let allMocksJs = fs.readdirSync(mocksJs)
let appData = {}
console.log('======================')
console.log(allMocks)
console.log(allMocksJs)
for (let i = 0; i < allMocks.length; i++) {
  let file = allMocks[i]
  if (/\.json$/.test(file)) {
    let data = fs.readFileSync(path.join(mocks, file), 'utf-8');
    data = data.replace(/[^:"]\/\/.+/g, '');
    try {
      let jsonObj = JSON.parse(data);
      Object.assign(appData, jsonObj)
    } catch (e) {
      console.log(mocks.red + path.sep.red + file.red + ' JSON syntax error'.red);
    }
  }
}


for (let i = 0; i < allMocksJs.length; i++) {
  let file = allMocksJs[i]
  if (/\.js$/.test(file)) {
    let data = require(path.join(mocksJs, file))
    console.log(data)
    try {
      Object.assign(appData, data)
    } catch (e) {
      console.log(mocks.red + path.sep.red + file.red + ' JSON syntax error'.red);
    }
  }
}


let proxy = {
  //  _proxy: {
  //    changeHost: true,
  //    // modify the http-proxy options
  //    httpProxy: {
  //      options: {
  //        ignorePath: true,
  //      },
  //      listeners: {
  //        proxyReq: function (proxyReq, req, res, options) {
  //          console.error(req);
  //        },
  //      },
  //    },
  //  },
}


for (let api in appData) {
  proxy[api] = appData[api]
}
console.log('接口：', proxy)

module.exports = proxy

