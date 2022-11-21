// app/config/video.js
module.exports = app => {
  const mongoose = app.mongoose
  const Schema = mongoose.Schema

  const videoSchema = new Schema({
    title: {
      type: String,
      required: true
    },
    descrption: {
      type: String,
      required: false
    },
    vodvideoId: {
      type: String,
      required: true
    },
    user: {
      type: mongoose.ObjectId,
      required: true,
      ref: 'User'
    },
    cover: {
      type: String,
      required: false
    },
    commentCount: {
      type: Number,
      default: 0
    },
    likeCount: {
      type: Number,
      default: 0
    },
    dislikeCount: {
      type: Number,
      default: 0
    },
    createdAt: { // 创建时间
      type: Date,
      default: Date.now
    },
    updatedAt: { // 更新时间
      type: Date,
      default: Date.now
    }
  })

  return mongoose.model('Video', videoSchema)
}