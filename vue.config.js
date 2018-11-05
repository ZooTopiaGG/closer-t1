module.exports = {
  lintOnSave: false,
  devServer: {
    host: "local.tiejin.cn",
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