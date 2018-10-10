/**
 * build: 线上使用
 * dev: qa环境
 * sandbox: sandbox环境
 * local: 本地调试
 */


export default {
  href: {
    build: 'https://a.tiejin.cn',
    dev: 'https://a-qa.tiejin.cn',
    sandbox: 'https://t1-sandbox.tiejin.cn',
    local: 'http://local.tiejin.cn:9999'
  },
  file: {
    build: 'https://file.tiejin.cn',
    dev: 'https://file-qa.tiejin.cn',
    sandbox: 'https://file-sandbox.tiejin.cn',
    local: 'https://file-sandbox.tiejin.cn'
  },
  server: {
    build: 'https://api.tiejin.cn/command/',
    dev: 'https://api-qa.tiejin.cn/command/',
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