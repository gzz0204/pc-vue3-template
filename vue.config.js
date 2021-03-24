const pkg = require('./package.json');
const path = require('path');
const apiMocker = require('mocker-api');

module.exports = {
  publicPath:
    process.env.NODE_ENV === 'production'
      ? `//static.ws.126.net/163/f2e/${pkg.channel}/${pkg.name}`
      : '',
  productionSourceMap: false,
  assetsDir: 'resource',
  // chainWebpack: config => {
  //   config.module
  //     // .rule('images')
  //     // .test(/\.(png|jpe?g|gif|webp)(\?.*)?$/)
  //     // .use('tinify-loader')
  //     //   .loader('tinify-loader')
  //     //   .tap(() => {
  //     //     return {
  //     //       apikey: 'ai3NQ23wq2pbQvy2JNylfuQMNJ99YAOZ',
  //     //       cache: path.resolve('node_modules/.cache/tinify-loader')
  //     //     }
  //     //   })
  //     // .end()
  // },
  chainWebpack: (config) => {
    config.plugin('html').tap((args) => {
      args[0].minify = false;
      return args;
    });
  },
  devServer: {
    disableHostCheck: true,
    hot: false,
    // port: 8080,
    before(app) {
      apiMocker(app, path.resolve('./mock/index.js'));
    },
    // proxy:{
    //   '/olympic/2020/match':{
    //     target:'http://t.c.m.163.com',
    //     changeOrigin: true,
    //     secure: false
    //   }
    // }
  },
  css: {
    extract:
      process.env.NODE_ENV === 'production'
        ? {
            ignoreOrder: true,
          }
        : false,
  },
  // 全局导入公共样式及变量
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [path.resolve('./src/style/common.less')],
    },
  },
};
