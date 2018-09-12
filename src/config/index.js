/**
 * build: 线上使用
 * dev: sandbox环境
 * local: 本地调试
 */

// 为方便vue.config.js中引入，这里使用nodejs识别的CommonJS规范
// 在项目中引用该模块时，请使用require()，而非es6的import from

module.exports = {
  href: {
    build: 'https://a.tiejin.cn',
    dev: 'https://a-sandbox.tiejin.cn',
    sandbox: 'https://t1-sandbox.tiejin.cn',
    local: 'http://local.tiejin.cn:9999'
  },
  file: {
    build: 'https://file.tiejin.cn',
    dev: 'https://file-sandbox.tiejin.cn',
    sandbox: 'https://file-sandbox.tiejin.cn',
    local: 'https://file-sandbox.tiejin.cn'
  },
  server: {
    build: 'https://api.tiejin.cn/command/',
    dev: 'https://api-sandbox.tiejin.cn/command/',
    sandbox: 'https://api-sandbox.tiejin.cn/command/',
    local: 'https://api-sandbox.tiejin.cn/command/'
  },
  download: {
    build: 'http://a.app.qq.com/o/simple.jsp?pkgname=com.ums.closer',
    dev: 'http://a.app.qq.com/o/simple.jsp?pkgname=com.ums.closer',
    sandbox: 'http://a.app.qq.com/o/simple.jsp?pkgname=com.ums.closer',
    local: 'http://a.app.qq.com/o/simple.jsp?pkgname=com.ums.closer'
  },
  wxAuthorization: {
    build: 'https://h5.tiejin.cn/redirect?redirectUrl=',
    dev: 'https://h5-sandbox.tiejin.cn/redirect?redirectUrl=',
    sandbox: 'https://h5-sandbox.tiejin.cn/redirect?redirectUrl=',
    local: 'https://h5-sandbox.tiejin.cn/redirect?redirectUrl='
  }
}