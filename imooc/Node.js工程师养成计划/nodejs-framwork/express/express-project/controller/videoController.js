const { Video, Videocomment, Videolike, Subscribe, collectModel } = require('../model/index')
const { hotInc, topHots } = require('../model/redis/redishotsinc')

exports.getHots = async (req, res) => {
  var topnum = req.params.topnum
  var tops = await topHots(topnum)
  res.status(200).json({tops})
}

// 观看+1 点赞+2 评论+2  收藏+3 

exports.collect = async (req, res) => {
  const videoId = req.params.videoId
  const userId = req.user.userinfo._id
  const video = await Video.findById(videoId)
  if (!video) {
    return res.status(404).json({ err: '视频不存在' })
  }
  var doc = await collectModel.findOne({
    user: userId,
    video: videoId
  })
  if (doc) {
    return res.status(403).json({ err: '视频以被收藏' })
  }
  const mycollect = await collectModel({
    user: userId,
    video: videoId
  }).save()

  if (mycollect) {
    await hotInc(videoId, 3)
  }

  res.status(201).json({ mycollect })
}

exports.likelist = async (req, res) => {
  const { pageNum = 1, pageSize = 10 } = req.body
  var likes = await Videolike.find({
    like: 1,
    user: req.user.userinfo._id
  }).skip((pageNum - 1) * pageSize)
    .limit(pageSize)
    .populate('video', "_id title vodvideoId user")

  var likeCount = await Videolike.countDocuments({
    like: 1,
    user: req.user.userinfo._id
  })
  res.status(200).json({ likes, likeCount })
}

exports.dislikevideo = async (req, res) => {
  const videoId = req.params.videoId
  const userId = req.user.userinfo._id
  const video = await Video.findById(videoId)
  if (!video) {
    return res.status(404).json({ err: "视频不存在" })
  }
  var doc = await Videolike.findOne({
    user: userId,
    video: videoId
  })

  let isdislike = true

  if (doc && doc.like === -1) {
    await doc.remove()
  } else if (doc && doc.like === 1) {
    doc.like = -1
    await doc.save()
    isdislike = false
  } else {
    await new Videolike({
      user: userId,
      video: videoId,
      like: -1
    }).save()
    isdislike = false
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
  res.status(200).json({
    ...video.toJSON(),
    isdislike
  })
}

exports.likevideo = async (req, res) => {
  const videoId = req.params.videoId
  const userId = req.user.userinfo._id
  const video = await Video.findById(videoId)
  if (!video) {
    return res.status(404).json({ err: "视频不存在" })
  }
  var doc = await Videolike.findOne({
    user: userId,
    video: videoId
  })

  let islike = true

  if (doc && doc.like === 1) {
    await doc.remove()
    islike = false
  } else if (doc && doc.like === -1) {
    doc.like = 1
    await doc.save()
    await hotInc(videoId, 2)
  } else {
    await new Videolike({
      user: userId,
      video: videoId,
      like: 1
    }).save()
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
  res.status(200).json({
    ...video.toJSON(),
    islike
  })
}


exports.deletecomment = async (req, res) => {
  const { videoId, commentId } = req.params
  const videoInfo = await Video.findById(videoId)
  if (!videoInfo) {
    return res.status(404).json({ err: "视频不存在" })
  }
  const comment = await Videocomment.findById(commentId)
  if (!comment) {
    return res.status(404).json({ err: "评论不存在" })
  }
  if (!comment.user.equals(req.user.userinfo._id)) {
    return res.status(403).json({ err: "评论不可删除" })
  }
  await comment.remove()
  videoInfo.commentCount--
  await videoInfo.save()
  res.status(200).json({ err: "删除成功" })

}

exports.commentlist = async (req, res) => {
  const videoId = req.params.videoId
  const { pageNum = 1, pageSize = 10 } = req.body
  const comments = await Videocomment
    .find({ video: videoId })
    .skip((pageNum - 1) * pageSize)
    .limit(pageSize)
    .populate('user', '_id username imgage')
  const commentCount = await Videocomment.countDocuments({ video: videoId })
  res.status(200).json({ comments, commentCount })
}
exports.comment = async (req, res) => {
  const { videoId } = req.params
  const videoInfo = await Video.findById(videoId)
  if (!videoInfo) {
    return res.status(404).josn({ err: "视频不存在" })
  }
  const comment = await new Videocomment({
    content: req.body.content,
    video: videoId,
    user: req.user.userinfo._id
  }).save()
  await hotInc(videoId, 2)
  videoInfo.commentCount++
  await videoInfo.save()
  res.status(201).json(comment)
}

exports.videolist = async (req, res) => {
  let { pageNum = 1, pageSize = 10 } = req.body

  var videolist = await Video.find()
    .skip((pageNum - 1) * pageSize)
    .limit(pageSize)
    .sort({ creatAt: -1 })
    .populate('user', '_id username cover')
  const getvideoCount = await Video.countDocuments()

  res.status(200).json({ videolist, getvideoCount })
}

exports.video = async (req, res) => {
  const { videoId } = req.params
  var videoInfo = await Video
    .findById(videoId)
    .populate('user', '_id username cover')
  videoInfo = videoInfo.toJSON()
  videoInfo.islike = false
  videoInfo.isDislike = false
  videoInfo.isSubscribe = false

  if (req.user.userinfo) {
    const userId = req.user.userinfo._id
    if (await Videolike.findOne({ user: userId, video: videoId, like: 1 })) {
      videoInfo.islike = true
    }
    if (await Videolike.findOne({ user: userId, video: videoId, like: -1 })) {
      videoInfo.isDislike = true
    }
    if (await Subscribe.findOne({ user: userId, channel: videoInfo.user._id })) {
      videoInfo.isSubscribe = true
    }
  }
  await hotInc(videoId, 1)
  res.status(200).json(videoInfo)
}

exports.createvideo = async (req, res) => {
  var body = req.body
  body.user = req.user.userinfo._id

  const videoModel = new Video(body)
  try {
    var dbback = await videoModel.save()
    res.status(201).json({ dbback })
  } catch (error) {
    res.status(500).json({ err: error })
  }
}