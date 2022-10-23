import config from '@/config/index'
import { getJWTPayload } from '@/common/Utils'
import { getValue } from '@/config/RedisConfig'
import adminController from '@/api/AdminController'
import { run } from './Init'

export default async (ctx, next) => {
  console.log(ctx.state.user)
  const auth = ctx.header.authorization
  if (auth) { // headers 有可能会是 undefine、null、空字符串
    let obj
    try {
      obj = await getJWTPayload(auth)
    } catch (error) {
      error.status = 401
      ctx.throw(error)
    }
    if (obj._id) {
      ctx._id = obj._id
      let admins = JSON.parse(await getValue('admin'))
      if (!admins) {
        admins = await run()
      }
      if (admins && admins.length > 0 && admins.includes(obj._id)) {
        ctx.isAdmin = true
        await next()
        return
      } else {
        ctx.isAdmin = false
      }
    }
  }
  // 1. 过滤掉公众路径
  const { publicPath } = config
  if (publicPath.some((item) => item.test(ctx.url))) {
    await next()
    return
  }
  // 2. 根据用户的roles -> menus -> operations
  const operations = await adminController.getOperations(ctx)
  // 3. 判断用户的请求路径是否在operations里面，如果在放行，否则禁止访问
  if (operations.includes(ctx.url.split('?')[0])) {
    await next()
  } else {
    ctx.throw(401)
  }
}
