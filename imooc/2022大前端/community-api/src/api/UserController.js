import SignRecord from '../model/SignRecord'
import { getJWTPayload, checkRedisAccountCode } from '../common/Utils'
import User from '../model/User'
import UserCollect from '../model/UserCollect'
import moment from 'dayjs'
import send from '@/config/MailConfig'
import { v4 as uuidv4 } from 'uuid'
import jwt from 'jsonwebtoken'
import config from '@/config'
import { setValue, getValue, delValue } from '@/config/RedisConfig'
import bcrypt from 'bcrypt'
import Comments from '@/model/Comments'
import qs from 'qs'
import CommentsHands from '@/model/CommentsHands'
class UserController {
  // 用户签到接口
  async userSign (ctx) {
    // 取用户的ID
    const obj = await getJWTPayload(ctx.header.authorization)
    // 查询用户上一次签到记录
    const record = await SignRecord.findByUid(obj._id)
    const user = await User.findByID(obj._id)
    let newRecord = {}
    let result = ''
    // 判断签到逻辑
    if (record !== null) {
      // 有历史的签到数据
      // 判断用户上一次签到记录的created时间是否与今天相同
      // 如果当前时间的日期与用户上一次的签到日期相同，说明用户已经签到
      if (
        moment(record.created).format('YYYY-MM-DD') ===
        moment().format('YYYY-MM-DD')
      ) {
        ctx.body = {
          code: 500,
          favs: user.favs,
          count: user.count,
          lastSign: record.created,
          msg: '用户已经签到'
        }
        return
      } else {
        // 有上一次的签到记录，并且不与今天相同，进行连续签到的判断
        // 如果相同，代表用户是在连续签到
        let count = user.count
        let fav = 0
        // 判断签到时间: 用户上一次的签到时间等于，当前时间的前一天，说明，用户在连续签到
        // 第n+1天签到的时候，需要与第n的天created比较
        if (
          moment(record.created).format('YYYY-MM-DD') ===
          moment()
            .subtract(1, 'days')
            .format('YYYY-MM-DD')
        ) {
          // 连续签到的积分获得逻辑
          count += 1
          if (count < 5) {
            fav = 5
          } else if (count >= 5 && count < 15) {
            fav = 10
          } else if (count >= 15 && count < 30) {
            fav = 15
          } else if (count >= 30 && count < 100) {
            fav = 20
          } else if (count >= 100 && count < 365) {
            fav = 30
          } else if (count >= 365) {
            fav = 50
          }
          await User.updateOne(
            { _id: obj._id },
            {
              // user.favs += fav
              // user.count += 1
              $inc: { favs: fav, count: 1 }
            }
          )
          result = {
            favs: user.favs + fav,
            count: user.count + 1
          }
        } else {
          // 用户中断了一次签到
          // 第n+1天签到的时候，需要与第n的天created比较，如果不相等，说明中断了签到。
          fav = 5
          await User.updateOne(
            { _id: obj._id },
            {
              $set: { count: 1 },
              $inc: { favs: fav }
            }
          )
          result = {
            favs: user.favs + fav,
            count: 1
          }
        }
        // 更新签到记录
        newRecord = new SignRecord({
          uid: obj._id,
          favs: fav
        })
        await newRecord.save()
      }
    } else {
      // 无签到数据 =》 第一次签到
      // 保存用户的签到数据，签到记数 + 积分数据
      await User.updateOne(
        {
          _id: obj._id
        },
        {
          $set: { count: 1 },
          $inc: { favs: 5 }
        }
      )
      // 保存用户的签到记录
      newRecord = new SignRecord({
        uid: obj._id,
        favs: 5
      })
      await newRecord.save()
      result = {
        favs: user.favs + 5,
        count: 1
      }
    }
    ctx.body = {
      code: 200,
      msg: '请求成功',
      ...result,
      lastSign: newRecord.created
    }
  }

  // 更新用户基本信息接口
  async updateUserInfo (ctx) {
    const { body } = ctx.request
    const obj = await getJWTPayload(ctx.header.authorization)
    // 判断用户是否修改了邮箱
    const user = await User.findOne({ _id: obj._id })
    let msg = ''
    if (body.username && body.username !== user.username) {
      // 用户修改了邮箱
      // 发送reset邮件
      // 判断用户的新邮箱是否已经有人注册
      const tmpUser = await User.findOne({ username: body.username })
      if (tmpUser && tmpUser.password) {
        ctx.body = {
          code: 501,
          msg: '邮箱已经注册'
        }
        return
      }
      const key = uuidv4()
      setValue(
        key,
        jwt.sign({ _id: obj._id }, config.JWT_SECRET, {
          expiresIn: '30m'
        })
      )
      await send({
        type: 'email',
        data: {
          key: key,
          username: body.username
        },
        code: '',
        expire: moment()
          .add(30, 'minutes')
          .format('YYYY-MM-DD HH:mm:ss'),
        email: user.username,
        user: user.name
      })
      msg = '更新基本资料成功，账号修改需要邮件确认，请查收邮件！'
    }

    const arr = ['username', 'mobile', 'password']
    arr.map(item => {
      return delete body[item]
    })
    const result = await User.updateOne({ _id: obj._id }, body)
    if (result.n === 1 && result.ok === 1) {
      ctx.body = {
        code: 200,
        msg: msg === '' ? '更新成功' : msg
      }
    } else {
      ctx.body = {
        code: 500,
        msg: '更新失败'
      }
    }
  }

  // 更新用户名
  async updateUsername (ctx) {
    const body = ctx.query
    if (body.key) {
      const token = await getValue(body.key)
      const obj = getJWTPayload('Bearer ' + token)
      await User.updateOne(
        { _id: obj._id },
        {
          username: body.username
        }
      )
      ctx.body = {
        code: 200,
        msg: '更新用户名成功'
      }
    }
  }

  // 修改密码接口
  async changePasswd (ctx) {
    const { body } = ctx.request
    const obj = await getJWTPayload(ctx.header.authorization)
    const user = await User.findOne({ _id: obj._id })
    if (await bcrypt.compare(body.oldpwd, user.password)) {
      const newpasswd = await bcrypt.hash(body.newpwd, 5)
      await User.updateOne({ _id: obj._id }, { $set: { password: newpasswd } })
      ctx.body = {
        code: 200,
        msg: '更新密码成功'
      }
    } else {
      ctx.body = {
        code: 500,
        msg: '更新密码错误，请检查！'
      }
    }
  }

  // 设置收藏
  async setCollect (ctx) {
    const params = ctx.query
    const obj = await getJWTPayload(ctx.header.authorization)
    if (parseInt(params.isFav)) {
      // 说明用户已经收藏了帖子
      await UserCollect.deleteOne({ uid: obj._id, tid: params.tid })
      ctx.body = {
        code: 200,
        msg: '取消收藏成功'
      }
    } else {
      const newCollect = new UserCollect({
        uid: obj._id,
        tid: params.tid,
        title: params.title
      })
      const result = await newCollect.save()
      if (result.uid) {
        ctx.body = {
          code: 200,
          data: result,
          msg: '收藏成功'
        }
      }
    }
  }

  // 获取收藏列表
  async getCollectByUid (ctx) {
    const params = ctx.query
    const obj = await getJWTPayload(ctx.header.authorization)
    const result = await UserCollect.getListByUid(
      obj._id,
      params.page,
      params.limit ? parseInt(params.limit) : 10
    )
    const total = await UserCollect.countByUid(obj._id)
    if (result.length > 0) {
      ctx.body = {
        code: 200,
        data: result,
        total,
        msg: '查询列表成功'
      }
    } else {
      ctx.body = {
        code: 500,
        msg: '查询列表失败'
      }
    }
  }

  // 获取用户基本信息
  async getBasicInfo (ctx) {
    const params = ctx.query
    // const obj = await getJWTPayload(ctx.header.authorization)
    const uid = params.uid || ctx._id
    let user = await User.findByID(uid)
    // 取得用户的签到记录 有没有 > today 0:00:00
    if (user) {
      user = user.toJSON()

      const date = moment().format('YYYY-MM-DD')
      const result = await SignRecord.findOne({
        uid: uid,
        created: { $gte: date + ' 00:00:00' }
      })
      if (result && result.uid) {
        user.isSign = true
      } else {
        user.isSign = false
      }
    }
    ctx.body = {
      code: 200,
      data: user,
      msg: '查询成功！'
    }
  }

  // 获取历史消息
  // 记录评论之后，给作者发送消息
  async getMsg (ctx) {
    const params = ctx.query
    const page = params.page ? params.page : 0
    const limit = params.limit ? parseInt(params.limit) : 0
    // 方法一： 嵌套查询 -> aggregate
    // 方法二： 通过冗余换时间
    const obj = await getJWTPayload(ctx.header.authorization)
    const num = await Comments.getTotal(obj._id)
    const result = await Comments.getMsgList(obj._id, page, limit)

    ctx.body = {
      code: 200,
      data: result,
      total: num
    }
  }

  // 设置已读消息
  async setMsg (ctx) {
    const params = ctx.query
    if (params.id) {
      const result = await Comments.updateOne(
        { _id: params.id },
        { isRead: '1' }
      )
      if (result.ok === 1) {
        ctx.body = {
          code: 200
        }
      }
    } else {
      const obj = await getJWTPayload(ctx.header.authorization)
      const result = await Comments.updateMany(
        { uid: obj._id },
        { isRead: '1' }
      )
      if (result.ok === 1) {
        ctx.body = {
          code: 200
        }
      }
    }
  }

  // 获取历史消息
  // 记录评论之后，给作者发送消息
  async getHands (ctx) {
    const params = ctx.query
    const page = params.page ? params.page : 0
    const limit = params.limit ? parseInt(params.limit) : 0
    // 方法一： 嵌套查询 -> aggregate
    // 方法二： 通过冗余换时间
    const obj = await getJWTPayload(ctx.header.authorization)
    const result = await CommentsHands.getHandsByUid(obj._id, page, limit)

    ctx.body = {
      code: 200,
      data: result
    }
  }

  // 获取用户列表
  async getUsers (ctx) {
    let params = ctx.query
    params = qs.parse(params)
    const page = params.page ? params.page : 0
    const limit = params.limit ? parseInt(params.limit) : 0
    const sort = params.sort || 'created'
    const option = params.option || {}
    const result = await User.getList(option, sort, page, limit)
    const total = await User.countList(option)
    ctx.body = {
      code: 200,
      data: result,
      total: total
    }
  }

  // 管理员删除用户
  async deleteUserById (ctx) {
    const { body } = ctx.request
    // const user = await User.findOne({ _id: params.id })
    // if (user) {
    const result = await User.deleteMany({ _id: { $in: body.ids } })
    ctx.body = {
      code: 200,
      msg: '删除成功',
      data: result
    }
    // } else {
    //   ctx.body = {
    //     code: 500,
    //     msg: '用户不存在或者id信息错误！'
    //   }
    // }
  }

  // 管理员更新用户
  async updateUserById (ctx) {
    const { body } = ctx.request

    const user = await User.findOne({ _id: body._id })
    // 1.校验用户是否存在 -> 用户名是否冲突
    if (!user) {
      ctx.body = {
        code: 500,
        msg: '用户不存在或者id信息错误！'
      }
      return
    }
    // if (body.username !== user.username) {
    //   const userCheckName = await User.findOne({ username: body.username })
    //   if (userCheckName) {
    //     ctx.body = {
    //       code: 501,
    //       msg: '用户名已经存在，更新失败！'
    //     }
    //     return
    //   }
    // }

    // 2.判断密码是否传递 -> 进行加密保存
    if (body.password) {
      body.password = await bcrypt.hash(body.password, 5)
    }
    const result = await User.updateOne({ _id: body._id }, body)
    if (result.ok === 1 && result.nModified === 1) {
      ctx.body = {
        code: 200,
        msg: '更新成功'
      }
    } else {
      ctx.body = {
        code: 500,
        msg: '服务异常，更新失败'
      }
    }
  }

  // 批量设置用户属性
  // 方法一：新增一个接口 方法二： options -> action 'one' 'many'
  async updateUserBatch (ctx) {
    const { body } = ctx.request
    const result = await User.updateMany(
      { _id: { $in: body.ids } },
      { $set: { ...body.settings } }
    )
    ctx.body = {
      code: 200,
      data: result
    }
  }

  async checkUsername (ctx) {
    const params = ctx.query
    const user = await User.findOne({ username: params.username })
    // 默认是 1 - 校验通过， 0 - 校验失败
    let result = 1
    if (user && user.username) {
      result = 0
    }
    ctx.body = {
      code: 200,
      data: result,
      msg: '用户名已经存在，更新失败！'
    }
  }

  async addUser (ctx) {
    const { body } = ctx.request
    body.password = await bcrypt.hash(body.password, 5)
    const user = new User(body)
    const result = await user.save()
    const userObj = result.toJSON()
    const arr = ['password']
    arr.map(item => {
      return delete userObj[item]
    })
    if (result) {
      ctx.body = {
        code: 200,
        data: userObj,
        msg: '添加用户成功'
      }
    } else {
      ctx.body = {
        code: 500,
        msg: '服务接口异常'
      }
    }
  }

  // 取得签到列表
  async getSignList (ctx) {
    const body = ctx.query
    try {
      let result = ''
      const type = parseInt(body.type)
      if (type === 1) {
        result = await SignRecord.findQuickestSign() // 今日签到榜
      } else if (type === 2) {
        result = await User.findTotalSign() // 总签到榜
      } else {
        result = await SignRecord.findLastSign()
      }
      ctx.body = {
        code: 200,
        msg: '',
        data: result
      }
    } catch (e) {
      ctx.body = {
        msg: '获取最新签到列表失败',
        code: 500
      }
    }
  }

  // 检测用户是否存在
  async isUserExist (ctx) {
    const body = ctx.query
    const option = {}
    body.phone && (option.mobile = body.phone)
    body.email && (option.username = body.email)
    const result = await User.queryCount(option)
    ctx.body = {
      result
    }
  }

  // 绑定邮箱或者手机号
  async accountUpdate (ctx) {
    const body = ctx.query
    const phone = body.phone
    const email = body.email
    const isCorrect = await checkRedisAccountCode((phone || email), body.sms)
    if (isCorrect) {
      delValue(phone || email) // 验证码使用后从 redis 中删除
      const obj = await getJWTPayload(ctx.header.authorization)
      if (phone) {
        await User.updateMobile(obj._id, phone)
      } else {
        await User.updateEmail(obj._id, email)
      }
      ctx.body = {
        code: 200,
        msg: '资料修改成功！'
      }
      return
    }
    ctx.body = {
      code: 500,
      msg: '验证码不正确！'
    }
  }
}

export default new UserController()
