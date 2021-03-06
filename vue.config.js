module.exports = {
  lintOnSave: false,
  devServer: {
    host: "t1-sandbox.tiejin.cn",
    port: "9999"
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