import Router from 'koa-router'
import contentController from '@/api/ContentController'
import userController from '@/api/UserController'
import adminController from '@/api/AdminController'
import errorController from '@/api/ErrorController'

const router = new Router()

router.prefix('/admin')

// 标签页面
// 获取标签列表
router.get('/getTags', contentController.getTags)

// 添加标签
router.post('/addTag', contentController.addTag)

// 删除标签
router.get('/removeTag', contentController.removeTag)

// 编辑标签
router.post('/editTag', contentController.updateTag)

// 用户管理
// 查询所有用户
router.get('/users', userController.getUsers)

// 删除
router.post('/deleteUser', userController.deleteUserById)

// 更新特定用户
router.post('/updateUser', userController.updateUserById)

router.post('/updateUserSettings', userController.updateUserBatch)

// 添加用户
router.post('/addUser', userController.addUser)

// 校验用户名是否冲突
router.get('/checkname', userController.checkUsername)

// 添加菜单
router.post('/addMenu', adminController.addMenu)

// 获取菜单
router.get('/getMenu', adminController.getMenu)

// 删除菜单
router.post('/deleteMenu', adminController.deleteMenu)

// 更新菜单
router.post('/updateMenu', adminController.updateMenu)

// 添加角色
router.post('/addRole', adminController.addRole)

// 获取角色
router.get('/getRoles', adminController.getRoles)

// 删除角色
router.post('/deleteRole', adminController.deleteRole)

// 更新角色
router.post('/updateRole', adminController.updateRole)

// 获取评论
router.get('/getComments', adminController.getCommentsAll)

// 删除评论
router.post('/deleteComments', adminController.deleteCommentsBatch)

// 批量更新评论
router.post('/updateCommentsBatch', adminController.updateCommentsBatch)

// 获取角色列表
router.get('/getRolesNames', adminController.getRoleNames)

// 获取用户 -> 角色 -> 动态菜单信息
router.get('/getRoutes', adminController.getRoutes)

// 获取统计数据
router.get('/getstat', adminController.getStats)

// 获取错误日志
router.get('/getError', errorController.getErrorList)

// 删除错误日志
router.post('/deleteError', errorController.deleteError)

// router.get('/getOperations', adminController.getOperations)

// 更新帖子
router.post('/content/updateId', contentController.updatePostByTid)

// 更新帖子设置
router.post('/content/updatePostSettings', contentController.updatePostBatch)

// 删除帖子
router.post('/content/delete', contentController.deletePost)

export default router
