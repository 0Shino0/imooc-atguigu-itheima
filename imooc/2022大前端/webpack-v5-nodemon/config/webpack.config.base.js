const path = require('path');

const utils = require('./utils');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const webpackconfig = {
  target: 'node',
  entry: {
    server: path.join(utils.APP_PATH, 'index.js'),
  },
  output: {
    filename: '[name].bundle.js',
    path: utils.DIST_PATH,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: 'babel-loader',
        },
        exclude: [path.join(__dirname, '/node_modules')],
      },
    ],
  },
  externals: [nodeExternals()],
  plugins: [
    new CleanWebpackPlugin(),
    // 可以直接使用 environmentPlugin
    new webpack.EnvironmentPlugin(['NODE_ENV']),
    // new webpack.DefinePlugin({
    //   'process.env': {
    //     NODE_ENV:
    //       process.env.NODE_ENV === 'production' ||
    //       process.env.NODE_ENV === 'prod'
    //         ? "'production'"
    //         : "'development'",
    //   },
    // }),
  ],
  node: {
    // webpack V4
    // console: true,
    // process: true,
    // Buffer: true,
    // setImmediate: true,
    // path: true,
    // webpack V5
    global: true,
    __filename: true,
    __dirname: true,
  },
};

// console.log(webpackconfig)

module.exports = webpackconfig;
