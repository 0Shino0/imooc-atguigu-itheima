// app/model/subscription.js
module.exports = app => {
  const mongoose = app.mongoose
  const Schema = mongoose.Schema

  const collectSchema = new Schema({
    user: {
      type: mongoose.ObjectId,
      required: true,
      ref: "User"
    },
    video: {
      type: mongoose.ObjectId,
      required: true,
      ref: "Video"
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

  return mongoose.model('Collect', collectSchema)
}