const { Video, Videocomment, Videolike, collectModel } = require('../model/index')
const { hotInc,tophots } = require('../model/redis/redishots')

// 热度排名
module.exports.gethots = async ctx=>{
  var topNum = ctx.request.params.num
  var tops =  await tophots(topNum)
  ctx.body = tops
}

// 视频收藏
module.exports.collect = async ctx => {
  const userId = ctx.user.userInfo._id
  const videoId = ctx.request.params.videoid
  const video = await Video.findById(videoId)
  if (!video) {
    return ctx.throw(404, '视频不存在')
  }
  var doc = await collectModel.findOne({
    user: userId,
    video: videoId
  })

  if (doc) {
    return ctx.throw(403, '视频已经被收藏')
  }

  var Collect = new collectModel({
    user: userId,
    video: videoId
  })
  var dbback = await Collect.save()
  if (dbback) {
    await hotInc(videoId, 3)
  }

  ctx.body = {dbback}

}

// 视频点赞
module.exports.likeVideo = async ctx => {
  const userId = ctx.user.userInfo._id
  const videoId = ctx.request.params.videoid

  const video = await Video.findById(videoId)
  if (!video) {
    return ctx.throw(404, '视频不存在')
  }
  var doc = await Videolike.findOne({
    user: userId,
    video: videoId
  })

  let isLike = true

  if (doc && doc.like === 1) {
    await doc.remove()
    isLike = false
  } else if (doc && doc.like === -1) {
    doc.like = 1
    await doc.save()
    await hotInc(videoId, 2)
  } else {
    var likeModel = new Videolike({
      user: userId,
      video: videoId,
      like: 1
    })
    await likeModel.save()
    await hotInc(videoId, 2)
  }

  video.likeCount = await Videolike.countDocuments({
    video: videoId,
    like: 1
  })

  video.dislikeCount = await Videolike.countDocuments({
    video: videoId,
    like: -1
  })
  await video.save()
  ctx.body = {
    ...video._doc,
    isLike
  }
}


// 获取视频评论列表
module.exports.commentList = async ctx => {
  const videoId = ctx.request.params.videoid
  const { pageNum = 1, pageSize = 10 } = ctx.request.query
  const comments = await Videocomment.find({ video: videoId })
    .skip((pageNum - 1) * pageSize)
    .limit(pageSize)
    .populate('user', [
      "image",
      "cover",
      "channeldes",
      "subscribeCount",
      "username"
    ])
  const commentCount = await Videocomment.countDocuments({ video: videoId })
  ctx.body = { comments, commentCount }

}

// 添加视频评论
module.exports.createComment = async ctx => {
  const videoId = ctx.request.params.videoid
  const { content } = ctx.request.body
  const userId = ctx.user.userInfo._id

  var videoInfo = await Video.findById(videoId)
  if (videoInfo) {
    var commetnModel = new Videocomment({
      content,
      video: videoId,
      user: userId
    })
    var dbback = await commetnModel.save()
    if (dbback) {
      videoInfo.commentCount++
      await videoInfo.save()
      // redis hot +2 
      await hotInc(videoId, 2)
      ctx.body = { msg: "评论成功" }
    } else {
      ctx.throw(501, '评论失败')
    }

  } else {
    ctx.throw(404, '视频不存在')
  }


}

// 获取视频详情
module.exports.getVideo = async ctx => {
  var videoid = ctx.request.params.videoid
  var dbback = await Video.findById(videoid)
    .populate('user', [
      "cover",
      "username",
      "image",
      "channeldes",
      "subscribeCount"
    ])
  var videoinfo = dbback._doc
  if (videoinfo) {
    const { gtevodplay } = require('./vodController')
    var vodinfo = await gtevodplay(videoinfo.vodvideoId)
    videoinfo.vod = vodinfo
    await hotInc(videoId, 1)
    ctx.body = videoinfo
  } else {
    ctx.throw(501, '视频不存在')
  }

  // ctx.body = dbback

}


// 频道视频列表
module.exports.videoList = async ctx => {
  var userid = ctx.request.params.userid
  var { pageNum = 1, pageSize = 10 } = ctx.request.query
  var videolist = await Video.find({ user: userid })
    .skip((pageNum - 1) * pageSize)
    .limit(pageSize)
    .sort({ createAt: -1 })
    .populate('user', [
      "cover",
      "username",
      "image",
      "channeldes",
      "subscribeCount"
    ])

  ctx.body = videolist
}

// 创建视频
module.exports.createVideo = async ctx => {
  var body = ctx.request.body
  body.user = ctx.user.userInfo._id
  const videoModel = new Video(body)
  try {
    var dbback = await videoModel.save()
    ctx.body = dbback
  } catch (error) {
    ctx.tthrow(502, error)
  }

}