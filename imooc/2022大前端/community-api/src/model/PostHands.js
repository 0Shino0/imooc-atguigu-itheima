import mongoose from '../config/DBHelpler'

const Schema = mongoose.Schema

const PostHandsSchema = new Schema({
  tid: { type: String, ref: 'post' },
  uid: { type: String, ref: 'users' } // 点赞用户的id
}, { timestamps: { createdAt: 'created', updatedAt: 'updated' } })

PostHandsSchema.post('save', function (error, doc, next) {
  if (error.name === 'MongoError' && error.code === 11000) {
    next(new Error('There was a duplicate key error'))
  } else {
    next(error)
  }
})

PostHandsSchema.statics = {
  getHandsByUid: function (id, page, limit) {
    return this.find({ uid: id })
      .populate({
        path: 'uid',
        select: '_id name'
      })
      .skip(page * limit)
      .limit(limit)
      .sort({ created: -1 })
  },
  deleteByCommentId: function (cid) {
    return this.deleteMany({ cid })
  }
}

const PostHands = mongoose.model('post_hands', PostHandsSchema)

export default PostHands
