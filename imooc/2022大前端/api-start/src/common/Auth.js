import config from '@/config/index'
import { getJWTPayload } from '@/common/Utils'
import { getValue } from '@/config/RedisConfig'
import adminController from '@/api/AdminController'
export default async (ctx, next) => {
  const headers = ctx.header.authorization
  if (headers) {
    const obj = await getJWTPayload(ctx.header.authorization)
    if (obj._id) {
      ctx._id = obj._id
      const admins = JSON.parse(await getValue('admin'))
      if (admins.includes(obj._id)) {
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
  if (operations.includes(ctx.url)) {
    await next()
  } else {
    ctx.throw(401)
  }
}
