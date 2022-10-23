import contentController from '@/api/ContentController'
import Router from 'koa-router'

const router = new Router()

router.prefix('/content')

// 上传图片
router.post('/upload', contentController.uploadImg)

// 发表新贴
router.post('/add', contentController.addPost)

// 小程序发表新贴
router.post('/wxAdd', contentController.addWxPost)

// 更新帖子
router.post('/update', contentController.updatePost)

router.post('/updateId', contentController.updatePostByTid)

router.post('/updatePostSettings', contentController.updatePostBatch)

// 删除帖子
router.post('/delete', contentController.deletePost)

export default router
