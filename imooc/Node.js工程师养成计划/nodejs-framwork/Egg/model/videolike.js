// app/model/video_like.js
module.exports = app => {
    const mongoose = app.mongoose
    const Schema = mongoose.Schema
  
    const likeSchema = new Schema({
      like: { // 点赞状态
        type: Number,
        enum: [1, -1], // 喜欢 1，不喜欢 -1
        required: true
      },
      user: { // 点赞用户
        type: mongoose.ObjectId,
        ref: 'User',
        required: true
      },
      video: { // 点赞视频
        type: mongoose.ObjectId,
        ref: 'Video',
        required: true
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
  
    return mongoose.model('VideoLike', likeSchema)
  }