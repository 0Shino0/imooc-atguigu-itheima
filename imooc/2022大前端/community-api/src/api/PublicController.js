import svgCaptcha from 'svg-captcha'
import moment from 'dayjs'
import { setValue } from '@/config/RedisConfig'
import Post from '@/model/Post'
import Comments from '../model/Comments'
import User from '@/model/User'
import SignRecord from '@/model/SignRecord'
import config from '@/config/index'
import sendCode from '@/common/Phone'
import send from '@/config/MailConfig'

class PublicController {
  // 获取图片验证码
  async getCaptcha (ctx) {
    const body = ctx.query
    const newCaptca = svgCaptcha.create({
      size: 4,
      ignoreChars: '0oO1ilLI',
      color: true,
      noise: Math.floor(Math.random() * 5),
      width: 150,
      height: 38
    })
    if (typeof body.sid === 'undefined') {
      ctx.body = {
        code: 500,
        msg: '参数不全！'
      }
      return
    }
    // 保存图片验证码数据，设置超时时间，单位: s
    // 设置图片验证码超时10分钟
    setValue(body.sid, newCaptca.text, 10 * 60)
    ctx.body = {
      code: 200,
      data: newCaptca.data
    }
  }

  async getHotPost (ctx) {
    // page limit
    // type index 0-3日内， 1-7日内， 2-30日内， 3-全部
    const params = ctx.query
    const page = params.page ? parseInt(params.page) : 0
    const limit = params.limit ? parseInt(params.limit) : 10
    const index = params.index ? params.index : '0'
    let startTime = ''
    let endTime = ''
    if (index === '0') {
      startTime = moment().subtract(2, 'day').format('YYYY-MM-DD 00:00:00')
    } else if (index === '1') {
      startTime = moment().subtract(6, 'day').format('YYYY-MM-DD 00:00:00')
    } else if (index === '2') {
      startTime = moment().subtract(29, 'day').format('YYYY-MM-DD 00:00:00')
    }
    endTime = moment().add(1, 'day').format('YYYY-MM-DD 00:00:00')
    const result = await Post.getHotPost(page, limit, startTime, endTime)
    const total = await Post.getHotPostCount(page, limit, startTime, endTime)
    ctx.body = {
      code: 200,
      total,
      data: result,
      msg: '获取热门文章成功'
    }
  }

  async getHotComments (ctx) {
    // 0-热门评论，1-最新评论
    const params = ctx.query
    const page = params.page ? parseInt(params.page) : 0
    const limit = params.limit ? parseInt(params.limit) : 10
    const index = params.index ? params.index : '0'
    const result = await Comments.getHotComments(page, limit, index)
    const total = await Comments.getHotCommentsCount(index)
    ctx.body = {
      code: 200,
      data: result,
      total,
      msg: '获取热门评论成功'
    }
  }

  async getHotSignRecord (ctx) {
    // 0-总签到榜，1-最新签到
    const params = ctx.query
    const page = params.page ? parseInt(params.page) : 0
    const limit = params.limit ? parseInt(params.limit) : 10
    const index = params.index ? params.index : '0'
    let result
    let total = 0
    if (index === '0') {
      // 总签到榜
      result = await User.getTotalSign(page, limit)
      total = await User.getTotalSignCount()
    } else if (index === '1') {
      // 今日签到
      result = await SignRecord.getTopSign(page, limit)
      total = await SignRecord.getTopSignCount()
    } else if (index === '2') {
      // 最新签到
      result = await SignRecord.getLatestSign(page, limit)
      total = await SignRecord.getSignCount()
    }
    ctx.body = {
      code: 200,
      data: result,
      total,
      msg: '获取签到排行成功'
    }
  }

  // 获取微信模板ID数组
  async getSubIds (ctx) {
    ctx.body = {
      code: 200,
      data: config.SubIds,
      msg: '获取成功'
    }
  }

  // 发送短信验证码、邮箱验证码
  async sendPhoneCode (ctx) {
    const body = ctx.request.query
    const sms = String(Math.random()).slice(-6)
    const account = body.phone || body.email
    const expire = moment().add(10, 'm').format('YYYY-MM-DD HH:mm:ss')
    let result
    if (body.phone) {
      result = await sendCode(account, sms)
    } else {
      result = await send(
        {
          code: sms,
          expire: expire,
          email: account
        },
        true // 表示发送的邮件类型是邮箱验证码
      )
    }

    // console.log('--->: ', sms)
    setValue(
      account,
      JSON.stringify({ sms, expire }),
      10 * 60
    )
    ctx.body = {
      code: 200,
      result
    }
  }
}

export default new PublicController()
