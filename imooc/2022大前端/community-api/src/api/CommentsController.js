import Comments from '../model/Comments'
import Post from '../model/Post'
import User from '../model/User'
import { checkCode } from '@/common/Utils'
import { getJWTPayload } from '../common/Utils'
import CommentsHands from '../model/CommentsHands'
import { wxSendMessage } from '@/common/WxUtils'

const canReply = async (ctx) => {
  let result = false
  const obj = await getJWTPayload(ctx.header.authorization)
  if (typeof obj._id === 'undefined') {
    return result
  } else {
    const user = await User.findByID(obj._id)
    if (user.status === '0') {
      result = true
    }
    return result
  }
}

class CommentsController {
  // 获取评论列表
  async getComments (ctx) {
    const params = ctx.query
    const tid = params.tid
    const page = params.page ? params.page : 0
    const limit = params.limit ? parseInt(params.limit) : 10
    let result = await Comments.getCommentsList(tid, page, limit)
    // 判断用户是否登录，已登录的用户才去判断点赞信息
    const auth = ctx.header.authorization
    const obj = auth ? await getJWTPayload(auth) : {}

    if (obj._id) {
      result = result.map(item => item.toJSON())
      for (let i = 0; i < result.length; i++) {
        let item = result[i]
        item.handed = '0'
        const commentsHands = await CommentsHands.findOne({ cid: item._id, uid: obj._id })
        if (commentsHands && commentsHands.cid) {
          if (commentsHands.uid === obj._id) {
            item.handed = '1'
          }
        }
      }
    }
    const total = await Comments.queryCount(tid)
    ctx.body = {
      code: 200,
      total,
      data: result,
      msg: '查询成功'
    }
  }

  // 获取用户最近的评论记录
  async getCommentPublic (ctx) {
    const params = ctx.query
    const result = await Comments.getCommetsPublic(params.uid, params.page, parseInt(params.limit))
    if (result.length > 0) {
      ctx.body = {
        code: 200,
        data: result,
        msg: '查询最近的评论记录成功'
      }
    } else {
      ctx.body = {
        code: 500,
        msg: '查询评论记录失败！'
      }
    }
  }

  // 添加评论
  async addComment (ctx) {
    const check = await canReply(ctx)
    if (!check) {
      ctx.body = {
        code: 500,
        msg: '用户已被禁言！'
      }
      return
    }
    const { body } = ctx.request
    const sid = body.sid
    const code = body.code
    // 验证图片验证码的时效性、正确性
    const result = await checkCode(sid, code)
    if (!result) {
      ctx.body = {
        code: 500,
        msg: '图片验证码不正确,请检查！'
      }
      return
    }
    const newComment = new Comments(body)
    const obj = await getJWTPayload(ctx.header.authorization)
    newComment.cuid = obj._id
    // 查询帖子的作者，以便发送消息
    const post = await Post.findOne({ _id: body.tid })
    newComment.uid = post.uid
    const comment = await newComment.save()
    const num = await Comments.getTotal(post.uid)
    global.ws.send(post.uid, JSON.stringify({
      event: 'message',
      message: num
    }))
    // 评论记数
    const updatePostresult = await Post.updateOne({ _id: body.tid }, { $inc: { answer: 1 } })
    if (comment._id && updatePostresult.ok === 1) {
      ctx.body = {
        code: 200,
        data: comment,
        msg: '评论成功'
      }
    } else {
      ctx.body = {
        code: 500,
        msg: '评论失败'
      }
    }
  }

  // 微信-添加评论
  async wxAddComment (ctx) {
    const { body } = ctx.request
    const obj = await getJWTPayload(ctx.header.authorization)
    const user = await User.findByID(obj._id)
    const newComment = new Comments(body)
    newComment.cuid = obj._id
    // 添加文章评论记数
    await Post.updateOne({ _id: body.tid }, { $inc: { answer: 1 } })
    const post = await Post.findByPostId(body.tid)
    newComment.uid = post.uid._id // 保存帖子作者的id
    const comment = await newComment.save()

    // 调用微信订阅消息api
    // 1、发帖的作者必须是用微信登录的才可以接收订阅消息
    // 2、自己不能给自己发订阅消息
    if ((obj._id !== post.uid._id.toString()) && post.uid.openid) {
      await wxSendMessage(body, post, user)
    }

    ctx.body = {
      msg: '回帖成功',
      code: 200,
      data: comment
    }
  }

  async updateComment (ctx) {
    const check = await canReply(ctx)
    if (!check) {
      ctx.body = {
        code: 500,
        msg: '用户已被禁言！'
      }
      return
    }
    const { body } = ctx.request
    const result = await Comments.updateOne({ _id: body.cid }, { $set: body })
    ctx.body = {
      code: 200,
      msg: '修改成功',
      data: result
    }
  }

  async setBest (ctx) {
    // 对用户权限的判断，post uid -> header id
    const obj = await getJWTPayload(ctx.header.authorization)
    if (typeof obj === 'undefined' && obj._id !== '') {
      ctx.body = {
        code: '401',
        msg: '用户未登录，或者用户未受权'
      }
      return
    }
    const params = ctx.query
    const post = await Post.findOne({ _id: params.tid })
    if (post.uid === obj._id && post.isEnd === '0') {
      // 说明这是作者本人，可以去设置isBest
      const result = await Post.updateOne({ _id: params.tid }, {
        $set: {
          isEnd: '1'
        }
      })
      const result1 = await Comments.updateOne({ _id: params.cid }, { $set: { isBest: '1' } })
      if (result.ok === 1 && result1.ok === 1) {
        // 把积分值给采纳的用户
        const comment = await Comments.findByCid(params.cid)
        const result2 = await User.updateOne({ _id: comment.cuid }, { $inc: { favs: parseInt(post.fav) } })
        if (result2.ok === 1) {
          ctx.body = {
            code: 200,
            msg: '设置成功',
            data: result2
          }
        } else {
          ctx.body = {
            code: 500,
            msg: '设置最佳答案-更新用户失败'
          }
        }
      } else {
        ctx.body = {
          code: 500,
          msg: '设置失败',
          data: { ...result, ...result1 }
        }
      }
    } else {
      ctx.body = {
        code: 500,
        msg: '帖子已结贴，无法重复设置'
      }
    }
  }

  async setHands (ctx) {
    const obj = await getJWTPayload(ctx.header.authorization)
    const params = ctx.query
    // 判断用户是否已经点赞
    const tmp = await CommentsHands.find({ cid: params.cid, uid: obj._id })
    if (tmp.length > 0) {
      ctx.body = {
        code: 200,
        msg: '您已经点赞，请勿重复点赞'
      }
      return
    }
    // 新增一条点赞记录
    const comment = await Comments.findById(params.cid)
    const newHands = new CommentsHands({
      cid: params.cid, // 评论id
      huid: comment.cuid, // 被赞用户
      uid: obj._id // 当前用户，即点赞用户
    })
    const data = await newHands.save()
    // 更新comments表中对应的记录的hands信息 +1
    const result = await Comments.updateOne({ _id: params.cid }, { $inc: { hands: 1 } })
    if (result.ok === 1) {
      ctx.body = {
        code: 200,
        msg: '点赞成功',
        data: data
      }
    } else {
      ctx.body = {
        code: 500,
        msg: '保存点赞记录失败！'
      }
    }
  }

  // 获取别人对我的帖子的最新评论
  async getCommentsOnMe (ctx) {
    const body = ctx.query
    const obj = await getJWTPayload(ctx.header.authorization)
    const limit = body.limit || 10
    const page = body.page || 0
    const comments = await Comments.getCommentsOnMe(obj._id, page * limit, limit)
    comments.forEach(item => {
      item.tid.content = item.tid.content.slice(0, 155)
    })

    ctx.body = {
      code: 200,
      comments
    }
  }

  // 获取对我点赞的用户
  async getHandUsersOnMe (ctx) {
    const body = ctx.query
    const obj = await getJWTPayload(ctx.header.authorization)
    const limit = body.limit || 10
    const page = body.page || 0
    const handUsers = await CommentsHands.getHandUsersOnMe(obj._id, page * limit, limit)

    ctx.body = {
      code: 200,
      handUsers
    }
  }

  // 取得热门评论
  async getCommentsCount (ctx) {
    const body = ctx.query
    const comments = await Comments.getCommentsCount(body.page)
    ctx.body = {
      code: 200,
      comments
    }
  }

  // 取得最新评论
  async getNewComments (ctx) {
    const body = ctx.query
    const comments = await Comments.getNewComments(body.page)
    comments.forEach(item => {
      item.content = item.content.substring(0, 30)
    })
    ctx.body = {
      code: 200,
      comments
    }
  }
}

export default new CommentsController()
