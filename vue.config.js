const path = require('path')

module.exports = {
  publicPath: '',
  configureWebpack: {
    resolve: {
      alias: {
        'styles': path.resolve(__dirname, './src/assets/styles'),
        'images': path.resolve(__dirname, './src/assets/images')
      }
    }
  }
}
