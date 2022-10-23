import Router from 'koa-router'
import contentController from '@/api/ContentController'

const router = new Router()

router.prefix('/content')

// 上传图片
router.post('/upload', contentController.uploadImg)

// 发表新贴
router.post('/add', contentController.addPost)

// 更新帖子
router.post('/update', contentController.updatePost)

// router.post('/updateId', contentController.updatePostByTid)

// router.post('/updatePostSettings', contentController.updatePostBatch)

// // 删除帖子
// router.post('/delete', contentController.deletePost)

// 微信发贴
router.post('/wxAdd', contentController.addWxPost)

// 取得浏览历史列表
router.get('/getPostHistory', contentController.getPostHistory)

// 收藏帖子
router.post('/setCollect', contentController.setCollect)

// 查询是否收藏某个帖子
router.get('/checkCollect', contentController.checkCollect)

// 删除收藏
router.get('/deleteCollect', contentController.deleteCollect)

// 获取用户发贴
router.get('/postAll', contentController.getAllPostByUid)

// 获取用户收藏(关联其它表)
router.get('/getCollectList', contentController.getCollectList)

export default router
