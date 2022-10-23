module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true
  },
  extends: ['eslint:recommended', 'standard', 'plugin:vue/essential'],
  parserOptions: {
    ecmaVersion: 12
  },
  plugins: ['vue'],
  rules: {
    // 这里有一些自定义配置
    'no-console': [
      'warn',
      {
        allow: ['warn', 'error']
      }
    ],
    'no-eval': 'error',
    'no-alert': 'error'
  },
  globals: {
    uni: 'readonly',
    plus: 'readonly',
    wx: 'readonly',
    getApp: 'readonly'
  }
}
