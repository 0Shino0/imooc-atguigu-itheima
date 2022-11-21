'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  const auth = app.middleware.auth()
  // router.get('/', controller.home.index);
  router.prefix('/api/v1')

  // 用户频道
  router.post('/users', controller.user.create)
  router.post('/users/login', controller.user.login)
  router.get('/users/info/:userid', app.middleware.auth({ required: false }), controller.user.userInfo)
  router.get('/users/subscribe/:subscribeid', auth, controller.user.subscribe)

  // 视频管理
  router.get('/video/getvod', auth, controller.vod.getvod)
  router.get('/video/getvideo/:videoid', controller.vod.getvideo)
  router.post('/video/comment/:videoid', auth, controller.video.createComment)
  router.get('/video/gethots', controller.video.gethots)
};
