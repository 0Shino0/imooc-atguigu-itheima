import moogoose from '../config/DBHelpler'

const Schema = moogoose.Schema

const UserCollectSchema = new Schema({
  uid: { type: String },
  tid: { type: String },
  title: { type: String },
  created: { type: Date }
})

UserCollectSchema.pre('save', function (next) {
  this.created = new Date()
  next()
})

UserCollectSchema.post('save', function (error, doc, next) {
  if (error.name === 'MongoError' && error.code === 11000) {
    next(new Error('There was a duplicate key error'))
  } else {
    next(error)
  }
})

UserCollectSchema.statics = {
  // 查询特定用户的收藏数据
  getListByUid: function (id, page, limit) {
    return this.find({ uid: id })
      .skip(limit * page)
      .limit(limit)
      .sort({ created: -1 })
  },
  // 查询总数
  countByUid: function (id) {
    return this.find({ uid: id }).countDocuments()
  }
}

const UserCollect = moogoose.model('user_collect', UserCollectSchema)

export default UserCollect
