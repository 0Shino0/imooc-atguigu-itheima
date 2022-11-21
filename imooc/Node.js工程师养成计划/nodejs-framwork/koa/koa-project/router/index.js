const Router = require('@koa/router')
const router = new Router({ prefix: '/api/v1' })
const userController = require('../controller/userController')

const { registerValidate, loginValidate } = require('../middleware/userValdate')
const { verifyToken } = require('../util/jwt')
const vodController = require('../controller/vodController')
const videoController = require('../controller/videoController')

// 用户频道模块
// router.get('/user/:userId', userController.index)
router.post('/user/register', registerValidate, userController.register)
router.post('/user/login', loginValidate, userController.login)
router.get('/user/getuser/:userid', verifyToken(false), userController.getuser)
router.get('/user/subscribe/:subscribeid', verifyToken(true), userController.subscribe)
router.get('/user/subscribelist', verifyToken(true), userController.subscribeList)

// 视频管理模块
router.get('/video/getvod', verifyToken(true), vodController.getvod)
router.post('/video/createvideo', verifyToken(true), videoController.createVideo)
router.get('/video/getvodplay', vodController.getPlay)
router.get('/video/videolist/:userid', videoController.videoList)
router.get('/video/getvideo/:videoid', videoController.getVideo)

// 交互模块
router.post('/video/comment/:videoid', verifyToken(true), videoController.createComment)
router.get('/video/commentlist/:videoid', videoController.commentList)
router.get('/video/likevideo/:videoid', verifyToken(true), videoController.likeVideo)
router.get('/video/collect/:videoid', verifyToken(true), videoController.collect)
router.get('/video/gethots/:num', videoController.gethots)

module.exports = router
