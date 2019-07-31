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
  },
  chainWebpack: config => {
    // 开发模式
    config.when(process.env.NODE_ENV === 'development', config => {
      config
        .entry('app')
        .clear()
        .add('./src/main-dev.js')
      config.plugin('html').tap(args => {
        args[0].isProd = false
        return args
      })
    })
    // 生产模式
    config.when(process.env.NODE_ENV === 'production', config => {
      // 打包时忽略的依赖项
      config.set('externals', {
        vue: 'Vue',
        'vue-router': 'VueRouter',
        fastclick: 'FastClick',
        'vue-awesome-swiper': 'VueAwesomeSwiper',
        axios: 'axios',
        vuex: 'Vuex',
        'better-scroll': 'BScroll'
      })
      config
        .entry('app')
        .clear()
        .add('./src/main-prod.js')
      config.plugin('html').tap(args => {
        args[0].isProd = true
        return args
      })
    })
  }
}
