'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  app.foo = 'app-foo'
  const { router, controller } = app;
  router.get('/', controller.home.index);
};
