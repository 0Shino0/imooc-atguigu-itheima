import log4js from '@/config/Log4j'
import ErrorRecord from '@/model/ErrorRecord'
import User from '@/model/User'
import config from '@/config/index'

const logger = log4js.getLogger('error')
export default async (ctx, next) => {
  try {
    await next()
    // 1. 收集用户错误的请求路径的日志 -> 造成大量的垃圾数据
    // 2. 主动判断，并收集特定的接口请求 -> regex -> path, status, params
    if (ctx.status !== 200 && config.isDevMode) {
      const codeMessage = {
        // 200: '服务器成功返回请求的数据。',
        201: '新建或修改数据成功。',
        202: '一个请求已经进入后台排队（异步任务）。',
        204: '删除数据成功。',
        400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
        401: '用户没有权限（令牌、用户名、密码错误）。',
        403: '用户得到授权，但是访问是被禁止的。',
        404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
        405: '请求方法不存在，请检查路由！',
        406: '请求的格式不可得。',
        410: '请求的资源被永久删除，且不会再得到的。',
        422: '当创建一个对象时，发生一个验证错误。',
        500: '服务器发生错误，请检查服务器。',
        502: '网关错误。',
        503: '服务不可用，服务器暂时过载或维护。',
        504: '网关超时。'
      }
      ctx.throw({
        code: ctx.status,
        message: codeMessage[ctx.status]
      })
    }
  } catch (err) {
    // 1. throw Error 2. ctx.throw()
    logger.error(`${ctx.url} ${ctx.method} ${ctx.status}
    ${err.stack}
    `)
    let user = ''
    if (ctx._id) {
      user = await User.findOne({ _id: ctx._id })
    }
    // 保存错误日志到数据库
    await ErrorRecord.create({
      message: err.message,
      code: ctx.response.status,
      method: ctx.method,
      path: ctx.path,
      param: ctx.method === 'GET' ? ctx.query : ctx.request.body,
      username: user.username,
      stack: err.stack
    })
    if (err.status === 401) {
      ctx.status = 401
      ctx.body = {
        code: 401,
        msg: 'Protected resource, use Authorization header to get access\n'
      }
    } else {
      ctx.status = err.status || 500
      ctx.body = Object.assign({
        code: err.code || 500,
        msg: err.message
      }, process.env.NODE_ENV === 'development'
        ? { stack: err.stack }
        : {})
      // console.log(err.stack);
    }
  }
}
