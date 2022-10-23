import mongoose from '@/config/DBHelpler'
import moment from 'dayjs'
import Comments from './Comments'
import UserCollect from './UserCollect'
import PostHistory from './PostHistory'

const Schema = mongoose.Schema

const PostSchema = new Schema({
  uid: { type: String, ref: 'users' },
  title: { type: String },
  content: { type: String },
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
}, { timestamps: { createdAt: 'created', updatedAt: 'updated' } })

PostSchema.virtual('user', {
  ref: 'users',
  localField: 'uid',
  foreignField: '_id'
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
  queryCount: function (options) {
    return this.find(options).countDocuments()
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
  },
  findByPostId: function (id) {
    return this.findOne({ _id: id }).populate({
      path: 'uid',
      select: 'name pic isVip _id openid'
    })
  },
  // 获取 num 天以内的热门评论
  getTopByDay: function (num, skip) {
    const querryOption = num ? { created: { $gte: moment().subtract(num, 'days') } } : {}
    return this.find(
      querryOption,
      { answer: 1, title: 1, _id: 1 }
    ).sort({ answer: -1 }).skip(skip * 15).limit(15)
  },
  // 根据uid查询发帖，可选参数：catalog-帖子类别
  queryByUserId: function (uid, limit, pageSize, catalog) {
    const option = { uid }
    catalog && (option.catalog = catalog)
    return this.find(option)
      .sort({ created: -1 })
      .skip(limit * (pageSize - 1))
      .limit(limit)
  },
  // 删除帖子，先删除该帖子相关的评论、收藏、浏览历史
  deleteManyAndRef: async function (conditions) {
    const postList = await this.find(conditions)
    console.assert(postList.length > 0, '未找到要删除的 post 文档！')
    for (let i = 0; i < postList.length; i++) {
      await Comments.deleteManyAndRef({ tid: postList[i]._id })
      await UserCollect.deleteByPostId(postList[i]._id)
      await PostHistory.deleteByPostId(postList[i]._id)
    }
    return this.deleteMany(conditions)
  }
}

const PostModel = mongoose.model('post', PostSchema)

export default PostModel
