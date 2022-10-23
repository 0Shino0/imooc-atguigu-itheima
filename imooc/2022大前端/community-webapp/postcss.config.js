module.exports = {
  plugins: {
    'postcss-px-to-viewport': {
      unitToConvert: 'px',
      viewportWidth: 750,
      unitPrecision: 5,
      propList: ['*'],
      viewportUnit: 'vw',
      fontViewportUnit: 'vw',
      selectorBlackList: ['.ignore'],
      minPixelValue: 1,
      mediaQuery: false,
      replace: true,
      exclude: [/(\/|\\)(node_modules)(\/|\\)/]
      // landscape: false, // 横屏配置
      // landscapeUnit: 'vw',
      // landscapeWidth: 568
    }
  }
}
