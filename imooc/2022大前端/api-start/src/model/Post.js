import mongoose from '@/config/DBHelpler'
import moment from 'dayjs'

const Schema = mongoose.Schema

const PostSchema = new Schema({
  uid: { type: String, ref: 'users' },
  title: { type: String },
  content: { type: String },
  created: { type: Date },
  catalog: { type: String },
  fav: { type: String },
  isEnd: { type: String, default: '0' },
  reads: { type: Number, default: 0 },
  answer: { type: Number, default: 0 },
  status: { type: String, default: '0' },
  isTop: { type: String, default: '0' },
  sort: { type: String, default: 100 },
  tags: {
    type: Array,
    default: [
      // {
      //   name: '',
      //   class: ''
      // }
    ]
  }
})

PostSchema.virtual('user', {
  ref: 'users',
  localField: 'uid',
  foreignField: '_id'
})

PostSchema.pre('save', function (next) {
  this.created = new Date()
  next()
})

PostSchema.statics = {
  /**
   * 获取文章列表数据
   * @param {Object} options 筛选条件
   * @param {String} sort 排序方式
   * @param {Number} page 分页页数
   * @param {Number} limit 分页条数
   */
  getList: function (options, sort, page, limit) {
    return this.find(options)
      .sort({ [sort]: -1 })
      .skip(page * limit)
      .limit(limit)
      .populate({
        path: 'uid',
        select: 'name isVip pic'
      })
  },
  countList: function (options) {
    return this.find(options).countDocuments()
  },
  getTopWeek: function () {
    return this.find({
      created: {
        $gte: moment().subtract(7, 'days')
      }
    }, {
      answer: 1,
      title: 1
    }).sort({ answer: -1 })
      .limit(15)
  },
  findByTid: function (id) {
    return this.findOne({ _id: id }).populate({
      path: 'uid',
      select: 'name pic isVip _id'
    })
  },
  getListByUid: function (id, page, limit) {
    return this.find({ uid: id })
      .skip(page * limit)
      .limit(limit)
      .sort({ created: -1 })
  },
  countByUid: function (id) {
    return this.find({ uid: id }).countDocuments()
  },
  getHotPost: function (page, limit, start, end) {
    let query = {}
    if (start !== '' && end !== '') {
      query = { created: { $gte: start, $lt: end } }
    }
    return this.find(query)
      .skip(limit * page)
      .limit(limit)
      .sort({ answer: -1 })
  },
  getHotPostCount: function (page, limit, start, end) {
    let query = {}
    if (start !== '' && end !== '') {
      query = { created: { $gte: start, $lt: end } }
    }
    return this.find(query).countDocuments()
  }
}

const PostModel = mongoose.model('post', PostSchema)

export default PostModel
