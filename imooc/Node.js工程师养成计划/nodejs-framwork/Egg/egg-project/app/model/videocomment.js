// app/model/video_comment.js
module.exports = app => {
    const mongoose = app.mongoose
    const Schema = mongoose.Schema
  
    const commentSchema = new Schema({
      content: { // 评论内容
        type: String,
        required: true
      },
      user: { // 评论用户
        type: mongoose.ObjectId,
        ref: 'User',
        required: true
      },
      video: { // 评论视频
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
  
    return mongoose.model('Videocomment', commentSchema)
  }