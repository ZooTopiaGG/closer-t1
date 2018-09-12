// 本地开发host和port获取，统一在~/src/config/index.js中设置
const baseConfig = require('./src/config/index')
const urlParams = baseConfig.href.local.split(':')
const host = urlParams[1].split('//')[1]
const port = urlParams[2] || 9999

module.exports = {
  lintOnSave: false,
  devServer: {
    host,
    port
  },
  configureWebpack: {
    performance: {
      maxEntrypointSize: 512000,
      maxAssetSize: 512000
    }
  },
  chainWebpack: config => {
    // A, remove the plugin
    config.plugins.delete('prefetch');
    config.plugins.delete('preload');
  }

}