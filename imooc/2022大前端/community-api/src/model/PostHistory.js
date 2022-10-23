import mongoose from '../config/DBHelpler'

const Schema = mongoose.Schema

const PostHistorySchema = new Schema(
  {
    uid: { type: String, ref: 'user', required: true },
    tid: { type: String, ref: 'post', required: true }
  },
  { timestamps: { createdAt: 'created', updatedAt: 'updated' } }
)

PostHistorySchema.statics = {
  queryCount (options) {
    return this.find(options).countDocuments()
  },
  addOrUpdate (uid, tid) { // 增加浏览记录，如果有则更新浏览时间
    return this.findOne({ uid, tid }).exec((err, doc) => {
      if (err) { console.log(err) }
      if (doc) {
        doc.created = new Date()
        doc.save()
      } else {
        this.create({ uid, tid })
      }
    })
  },
  delOne (uid, tid) {
    return this.deleteOne({ uid, tid })
  },
  getListByUid (uid, skip, limit) { // 获取用户的浏览记录
    return this.find({ uid })
      .sort({ created: -1 })
      .skip(skip)
      .limit(limit)
      .populate({
        path: 'tid',
        select: 'uid catalog title content answer created',
        populate: {
          path: 'uid',
          select: 'name pic'
        }
      })
  },
  deleteByPostId: function (tid) {
    return this.deleteMany({ tid })
  }
}

const PostHistory = mongoose.model('post_history', PostHistorySchema)

export default PostHistory
