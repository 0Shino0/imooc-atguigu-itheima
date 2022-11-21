/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1655792297469_7249';

  // add your middleware config here
  config.middleware = ['errorHandler'];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  config.mongoose = {
    client: {
      url: 'mongodb://127.0.0.1/express-video',
      options: {},
      // mongoose global plugins, expected a function or an array of function and options
      plugins: [],
    },
  }

  config.security= {
    csrf:{
      enable:false
    }
  }

  config.jwt = {
    secret:'f2d1c153-39ec-4327-8c86-0d7308ad84f0',
    expiresIn:'1d'
  }

  return {
    ...config,
    ...userConfig,
  };
};
