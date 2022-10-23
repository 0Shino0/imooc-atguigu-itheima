import Router from 'koa-router'
import statisticsController from '@/api/StatisticsController'
import userController from '@/api/UserController'
import contentController from '@/api/ContentController'
import loginController from '@/api/LoginController'
import commentsController from '@/api/CommentsController'

const router = new Router()
// ====================登录相关 ====================
// 微信登录
router.post('/login/wxlogin', loginController.wxlogin)

// 解析用户的手机号
router.post('/login/getMobile', loginController.getMobile)

// 短信登录
router.post('/login/loginByPhoneCode', loginController.loginByPhoneCode)

// 快速登录，用于切换账号
router.post('/login/quickLogin', loginController.quickLogin)

// ====================用户相关 ====================
// 微信个人中心统计数字
router.get('/user/wxUserCount', statisticsController.wxUserCount)

// 检测用户是否存在
router.get('/user/isUserExist', userController.isUserExist)

// 更新手机号码或者邮箱
router.get('/user/accountUpdate', userController.accountUpdate)

// wx上传图片
router.post('/uploadImg', contentController.uploadImg)

// ====================统计相关 ====================
// 根据天数获取热榜
router.get('/public/getTopByDay', contentController.getTopByDay)

// 获取签到列表
router.get('/public/signlist', userController.getSignList)

// ====================内容相关 ====================
// 小程序添加文章
router.post('/content/wxAdd', contentController.wxAddPost)

// 删除用户浏览记录
router.get('/content/deletePostHistory', contentController.deletePostHistory)

// ====================评论相关 ====================
// 取得关于我的所有帖子的最新评论
router.get('/getCommentsOnMe', commentsController.getCommentsOnMe)

// 获取对我点赞的用户
router.get('/getHandUsersOnMe', commentsController.getHandUsersOnMe)

export default router
