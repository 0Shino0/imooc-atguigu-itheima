const path = require('path')

const resolve = (dir) => path.join(__dirname, dir)

module.exports = {
  productionSourceMap: false,
  chainWebpack: (config) => {
    const svgRule = config.module.rule('svg')
    const terser = config.optimization.minimizer('terser')
    svgRule.uses.clear()
    // GraphQL Loader
    svgRule
      .test(/\.svg$/)
      .include.add(resolve('./src/assets/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
    config.module
      .rule('images')
      .test(/\.(png|jpe?g|gif|webp|svg)(\?.*)?$/)
      .exclude.add(resolve('./src/assets/icons'))
    terser.tap((args) => {
      args[0].terserOptions.compress.drop_console = true
      return args
    })
  },
  css: {
    loaderOptions: {
      sass: {
        // 这里的选项会传递给 sass-loader
        prependData: '@import "@/assets/styles/_variables.scss";'
      }
    }
  }
}
