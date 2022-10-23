import Post from '../model/Post'
import Links from '../model/Links'
// method1
// import { dirExists } from '@/common/Utils'
import { checkCode, getJWTPayload } from '@/common/Utils'
import { hwUpload } from '@/common/HwUtils'
import User from '@/model/User'
import PostTags from '@/model/PostTags'
import UserCollect from '../model/UserCollect'
import qs from 'qs'
import PostHistory from '../model/PostHistory'
import moment from 'dayjs'
import { v4 as uuidv4 } from 'uuid'
import { wxMsgCheck, wxImgCheck } from '@/common/WxUtils'

class ContentController {
  // 获取文章列表
  async getPostList (ctx) {
    const body = qs.parse(ctx.query)

    const sort = body.sort ? body.sort : 'created'
    const page = body.page ? parseInt(body.page) : 0
    const limit = body.limit ? parseInt(body.limit) : 20
    const options = {}

    if (body.title) {
      options.title = { $regex: body.title }
    }
    if (body.catalog && body.catalog.length > 0) {
      options.catalog = { $in: body.catalog }
    }
    if (body.isTop) {
      options.isTop = body.isTop
    }
    if (body.isEnd) {
      options.isEnd = body.isEnd
    }
    if (body.status) {
      options.status = body.status
    }
    if (typeof body.tag !== 'undefined' && body.tag !== '') {
      options.tags = { $elemMatch: { name: body.tag } }
    }
    const result = await Post.getList(options, sort, page, limit)
    const total = await Post.countList(options)

    ctx.body = {
      code: 200,
      data: result,
      msg: '获取文章列表成功',
      total: total
    }
  }

  // 查询友链
  async getLinks (ctx) {
    const result = await Links.find({ type: 'links' })
    ctx.body = {
      code: 200,
      data: result
    }
  }

  // 查询温馨提醒
  async getTips (ctx) {
    const result = await Links.find({ type: 'tips' })
    ctx.body = {
      code: 200,
      data: result
    }
  }

  // 本周热议
  async getTopWeek (ctx) {
    const result = await Post.getTopWeek()
    ctx.body = {
      code: 200,
      data: result
    }
  }

  // 上传图片
  async uploadImg (ctx) {
    const file = ctx.request.files.file
    const result = await wxImgCheck(file)
    if (result.errcode === 0) {
      const uuid = uuidv4()
      // 图片名称、图片格式、存储的位置，返回前台一可以读取的路径
      const user = await User.findByID(ctx._id)
      const fileName = `${user.username}/${moment().format(
        'YYYY-MM-DD'
      )}/${uuid}-${file.name}`
      try {
        const result = await hwUpload(fileName, file.path)
        ctx.body = {
          code: 200,
          msg: '图片上传成功',
          data: result
        }
      } catch (error) {
        ctx.body = {
          code: 500,
          msg: '图片上传失败' + error.message
        }
      }

      // 本地上传

      // const ext = file.name.split('.').pop()
      // const dir = `${config.uploadPath}/${moment().format('YYYYMMDD')}`
      // // 判断路径是否存在，不存在则创建
      // await mkdir(dir)
      // // 存储文件到指定的路径
      // // 给文件一个唯一的名称
      // const picname = uuid()
      // const destPath = `${dir}/${picname}.${ext}`
      // const reader = fs.createReadStream(file.path)
      // const upStream = fs.createWriteStream(destPath)
      // const filePath = `/${moment().format('YYYYMMDD')}/${picname}.${ext}`
      // // method 1
      // reader.pipe(upStream)

      // const stat = fs.statSync(file.path)
      // method 2
      // let totalLength = 0
      // reader.on('data', (chunk) => {
      //   totalLength += chunk.length
      //   if (upStream.write(chunk) === false) {
      //     reader.pause()
      //   }
      // })

      // upStream.on('drain', () => {
      //   reader.resume()
      // })

      // reader.on('end', () => {
      //   upStream.end()
      // })
    } else {
      ctx.body = {
        code: 200,
        msg: result.errmsg
      }
    }
  }

  // 添加新贴
  async addPost (ctx) {
    const { body } = ctx.request
    const sid = body.sid
    const code = body.code
    // 验证图片验证码的时效性、正确性
    const result = await checkCode(sid, code)
    if (result) {
      const obj = await getJWTPayload(ctx.header.authorization)
      // 判断用户的积分数是否 > fav，否则，提示用户积分不足发贴
      // 用户积分足够的时候，新建Post，减除用户对应的积分
      const user = await User.findByID({ _id: obj._id })
      if (user.favs < body.fav) {
        ctx.body = {
          code: 501,
          msg: '积分不足'
        }
        return
      } else {
        await User.updateOne({ _id: obj._id }, { $inc: { favs: -body.fav } })
      }
      const newPost = new Post(body)
      newPost.uid = obj._id
      const result = await newPost.save()
      ctx.body = {
        code: 200,
        msg: '成功的保存的文章',
        data: result
      }
    } else {
      // 图片验证码验证失败
      ctx.body = {
        code: 500,
        msg: '图片验证码验证失败'
      }
    }
  }

  // 微信发贴
  async addWxPost (ctx) {
    const { body } = ctx.request
    const content = body.content
    // 验证图片验证码的时效性、正确性
    const result = await wxMsgCheck(content)
    if (result.errcode === 0 && ctx._id) {
      const id = ctx._id
      // const obj = await getJWTPayload(ctx.header.authorization)
      // 判断用户的积分数是否 > fav，否则，提示用户积分不足发贴
      // 用户积分足够的时候，新建Post，减除用户对应的积分
      const user = await User.findByID({ _id: id })
      if (user.favs < body.fav) {
        ctx.body = {
          code: 501,
          msg: '积分不足'
        }
        return
      } else {
        await User.updateOne({ _id: id }, { $inc: { favs: -body.fav } })
      }
      const newPost = new Post(body)
      newPost.uid = id
      const result = await newPost.save()
      ctx.body = {
        code: 200,
        msg: '成功的保存的文章',
        data: result
      }
    } else {
      ctx.body = {
        code: 500,
        msg: '内容安全：' + result.errmsg
      }
    }
  }

  // 更新帖子
  async updatePost (ctx) {
    const { body } = ctx.request
    const sid = body.sid
    const code = body.code
    // 验证图片验证码的时效性、正确性
    const result = await checkCode(sid, code)
    if (result) {
      const obj = await getJWTPayload(ctx.header.authorization)
      // 判断帖子作者是否为本人
      const post = await Post.findOne({ _id: body.tid })
      // 判断帖子是否结贴
      if (post.uid === obj._id && post.isEnd === '0') {
        const result = await Post.updateOne({ _id: body.tid }, body)
        if (result.ok === 1) {
          ctx.body = {
            code: 200,
            data: result,
            msg: '更新帖子成功'
          }
        } else {
          ctx.body = {
            code: 500,
            data: result,
            msg: '编辑帖子，更新失败'
          }
        }
      } else {
        ctx.body = {
          code: 401,
          msg: '没有操作的权限'
        }
      }
    } else {
      // 图片验证码验证失败
      ctx.body = {
        code: 500,
        msg: '图片验证码验证失败'
      }
    }
  }

  async updatePostByTid (ctx) {
    const { body } = ctx.request
    const result = await Post.updateOne({ _id: body._id }, body)
    if (result.ok === 1) {
      ctx.body = {
        code: 200,
        data: result,
        msg: '更新帖子成功'
      }
    } else {
      ctx.body = {
        code: 500,
        data: result,
        msg: '编辑帖子，更新失败'
      }
    }
  }

  // 获取文章详情
  async getPostDetail (ctx) {
    const params = ctx.query
    if (!params.tid) {
      ctx.body = {
        code: 500,
        msg: '文章id为空'
      }
      return
    }
    const post = await Post.findByTid(params.tid)
    if (!post) {
      ctx.body = {
        code: 200,
        data: {},
        msg: '查询文章详情成功'
      }
      return
    }
    let isFav = 0
    // 判断用户是否传递Authorization的数据，即是否登录
    if (
      typeof ctx.header.authorization !== 'undefined' &&
      ctx.header.authorization !== ''
    ) {
      const obj = await getJWTPayload(ctx.header.authorization)
      const userCollect = await UserCollect.findOne({
        uid: obj._id,
        tid: params.tid
      })
      if (userCollect && userCollect.tid) {
        isFav = 1
      }
      await PostHistory.addOrUpdate(obj._id, params.tid) // 添加浏览记录
    }
    const newPost = post.toJSON()
    newPost.isFav = isFav
    // 更新文章阅读记数
    const result = await Post.updateOne(
      { _id: params.tid },
      { $inc: { reads: 1 } }
    )
    if (post._id && result.ok === 1) {
      ctx.body = {
        code: 200,
        data: newPost,
        msg: '查询文章详情成功'
      }
    } else {
      ctx.body = {
        code: 500,
        msg: '获取文章详情失败'
      }
    }
    // const post = await Post.findOne({ _id: params.tid })
    // const result = rename(post.toJSON(), 'uid', 'user')
  }

  // 获取用户发贴记录
  async getPostByUid (ctx) {
    const params = ctx.query
    const obj = await getJWTPayload(ctx.header.authorization)
    const result = await Post.getListByUid(
      obj._id,
      params.page,
      params.limit ? parseInt(params.limit) : 10
    )
    const total = await Post.countByUid(obj._id)
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

  // 获取用户发贴记录
  async getPostPublic (ctx) {
    const params = ctx.query
    const result = await Post.getListByUid(
      params.uid,
      params.page,
      params.limit ? parseInt(params.limit) : 10
    )
    const total = await Post.countByUid(params.uid)
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

  // 删除发贴记录
  async deletePostByUid (ctx) {
    const params = ctx.query
    const obj = await getJWTPayload(ctx.header.authorization)
    const post = await Post.findOne({ uid: obj._id, _id: params.tid })
    if (post.id === params.tid && post.isEnd === '0') {
      await ContentController.prototype.deletePost(ctx)
      // const result = await Post.deleteOne({ _id: params.tid })
      // if (result.ok === 1) {
      //   ctx.body = {
      //     code: 200,
      //     msg: '删除成功'
      //   }
      // } else {
      //   ctx.body = {
      //     code: 500,
      //     msg: '执行删除失败！'
      //   }
      // }
    } else {
      ctx.body = {
        code: 500,
        msg: '删除失败，无权限！'
      }
    }
  }

  async deletePost (ctx) {
    const { body } = ctx.request
    // 删除帖子的同时要删除关联表中的数据
    const result = await Post.deleteManyAndRef({ _id: { $in: body.ids } })
    if (result.ok === 1) {
      ctx.body = {
        code: 200,
        msg: '删除成功'
      }
    } else {
      ctx.body = {
        code: 500,
        msg: '执行删除失败！'
      }
    }
  }

  // 添加标签
  async addTag (ctx) {
    const { body } = ctx.request
    const tag = new PostTags(body)
    await tag.save()
    ctx.body = {
      code: 200,
      msg: '标签保存成功'
    }
  }

  // 添加标签
  async getTags (ctx) {
    const params = ctx.query
    const page = params.page ? parseInt(params.page) : 0
    const limit = params.limit ? parseInt(params.limit) : 10
    const result = await PostTags.getList({}, page, limit)
    const total = await PostTags.countList({})
    ctx.body = {
      code: 200,
      data: result,
      total,
      msg: '查询tags成功！'
    }
  }

  // 删除标签
  async removeTag (ctx) {
    const params = ctx.query
    const result = await PostTags.deleteOne({ id: params.ptid })

    ctx.body = {
      code: 200,
      data: result,
      msg: '删除成功'
    }
  }

  // 删除标签
  async updateTag (ctx) {
    const { body } = ctx.request
    const result = await PostTags.updateOne({ _id: body._id }, body)

    ctx.body = {
      code: 200,
      data: result,
      msg: '更新成功'
    }
  }

  // 批量修改帖子
  async updatePostBatch (ctx) {
    const { body } = ctx.request
    const result = await Post.updateMany(
      { _id: { $in: body.ids } },
      { $set: { ...body.settings } }
    )
    ctx.body = {
      code: 200,
      data: result
    }
  }

  // 取得浏览历史列表
  async getPostHistory (ctx) {
    const body = ctx.query
    const limit = parseInt(body.limit) || 10
    const skip = ((body.currentPage || 1) - 1) * limit
    const historyList = await PostHistory.getListByUid(body.uid, skip, limit)
    ctx.body = {
      code: 200,
      historyList
    }
  }

  // 收藏帖子
  async setCollect (ctx) {
    const { body } = ctx.request
    const obj = await getJWTPayload(ctx.header.authorization)
    const isCollect = body.isCollect
    // isCollect false - 未收藏 => 转成收藏， true - 收藏了 => 删除收藏
    const result = await UserCollect.handleCollect(obj._id, body.tid, isCollect)
    ctx.body = {
      code: 200,
      data: result,
      isCollect: !isCollect,
      msg: isCollect ? '已取消收藏！' : '收藏成功！'
    }
  }

  // 查询是否收藏过某个帖子
  async checkCollect (ctx) {
    const body = ctx.query
    const obj = await getJWTPayload(ctx.header.authorization)
    const result = await UserCollect.findOne({ uid: obj._id, tid: body.tid })
    let isCollect = false
    if (result) {
      isCollect = true
    }
    ctx.body = {
      code: 200,
      isCollect: isCollect,
      msg: '查询收藏成功'
    }
  }

  // 获取近几天的热门帖子
  async getTopByDay (ctx) {
    try {
      const body = ctx.query
      const post = await Post.getTopByDay(body.days, body.page)
      ctx.body = {
        msg: '',
        code: 200,
        data: post
      }
    } catch (e) {
      ctx.body = {
        msg: '热门帖子失败',
        code: 500
      }
    }
  }

  async getAllPostByUid (ctx) {
    const body = ctx.query
    const uid = body.uid
    const catalog = body.catalog || ''
    const limit = body.pageSize || 10
    const pageSize = body.currentPage || 1
    try {
      const postsList = await Post.queryByUserId(
        uid,
        parseInt(limit),
        parseInt(pageSize),
        catalog
      )
      const total = await Post.queryCount({ uid: ctx.query.uid })
      if (body.startTime) {
        // options.created = { $gte: body.startTime, $lt: body.endTime }
      }
      ctx.body = {
        code: 200,
        total: total,
        data: postsList
      }
    } catch (e) {
      ctx.body = {
        msg: '获取列表失败',
        code: 500
      }
    }
  }

  async getCollectList (ctx) {
    // 获取详细的用户收藏列表
    const body = ctx.query
    const uid = body.uid
    const limit = parseInt(body.limit) || 10
    const skip = ((body.currentPage || 1) - 1) * limit
    const collectList = await UserCollect.getCollectList(uid, skip, limit)
    ctx.body = {
      code: 200,
      collectList
    }
  }

  async deletePostHistory (ctx) {
    // 删除浏览记录
    const body = ctx.query
    const obj = await getJWTPayload(ctx.header.authorization)
    const result = await PostHistory.delOne(obj._id, body.tid)

    ctx.body = {
      code: 200,
      result
    }
  }

  async deleteCollect (ctx) {
    // 删除用户收藏
    const body = ctx.query
    const obj = await getJWTPayload(ctx.header.authorization)
    const result = await UserCollect.deleteCollect(obj._id, body.tid)
    ctx.body = {
      code: 200,
      result
    }
  }

  // 小程序新增文章
  async wxAddPost (ctx) {
    const { body } = ctx.request
    try {
      const obj = await getJWTPayload(ctx.header.authorization)
      let post = {}
      const _user = await User.findOne({ _id: obj._id })
      if (_user.favs < body.fav) {
        ctx.body = {
          code: 200,
          msg: '您的积分不足！'
        }
        return
      } else {
        // 扣除相应的积分
        await User.updateOne({ _id: obj._id }, { favs: (_user.favs - body.fav) })
      }
      const newPost = new Post(body)
      newPost.uid = obj._id
      post = await newPost.save()
      ctx.body = {
        msg: '',
        code: 200,
        data: post
      }
    } catch (e) {
      // console.log(e)
      ctx.body = {
        msg: '添加文章详情失败',
        code: 500
      }
    }
  }
}

export default new ContentController()
