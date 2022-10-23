import mongoose from '@/config/DBHelpler'
import { getTempName } from '@/common/Utils'

const Schema = mongoose.Schema

const UserSchema = new Schema({
  username: { type: String, index: { unique: true }, sparse: true },
  password: { type: String },
  name: { type: String },
  // created: { type: Date },
  // updated: { type: Date },
  favs: { type: Number, default: 100 },
  gender: { type: String, default: '' },
  roles: { type: Array, default: ['user'] },
  pic: { type: String, default: '/img/header.jpg' },
  mobile: { type: String, match: /^1[3-9](\d{9})$/, default: '' },
  status: { type: String, default: '0' },
  regmark: { type: String, default: '' },
  location: { type: String, default: '' },
  isVip: { type: String, default: '0' },
  count: { type: Number, default: 0 },
  openid: { type: String, default: '' },
  unionid: { type: String, default: '' } // 对于开放平台的
}, { timestamps: { createdAt: 'created', updatedAt: 'updated' } })

UserSchema.pre('save', function (next) {
  this.created = new Date()
  next()
})

UserSchema.pre('update', function (next) {
  this.updated = new Date()
  next()
})

UserSchema.post('save', function (error, doc, next) {
  if (error.name === 'MongoError' && error.code === 11000) {
    next(new Error('Error: Monngoose has a duplicate key.'))
  } else {
    next(error)
  }
})

UserSchema.statics = {
  findByID: function (id) {
    return this.findOne(
      { _id: id },
      {
        password: 0
      }
    )
  },
  getList: function (options, sort, page, limit) {
    // 1. datepicker -> item: string, search -> array  startitme,endtime
    // 2. radio -> key-value $in
    // 3. select -> key-array $in
    let query = {}
    if (typeof options.search !== 'undefined') {
      if (typeof options.search === 'string' && options.search.trim() !== '') {
        if (['name', 'username'].includes(options.item)) {
          // 模糊匹配
          query[options.item] = { $regex: new RegExp(options.search) }
          // =》 { name: { $regex: /admin/ } } => mysql like %admin%
        } else {
          // radio
          query[options.item] = options.search
        }
      }
      if (options.item === 'roles') {
        query = { roles: { $in: options.search } }
      }
      if (options.item === 'created') {
        const start = options.search[0]
        const end = options.search[1]
        query = { created: { $gte: new Date(start), $lt: new Date(end) } }
      }
    }
    return this.find(query, { password: 0, mobile: 0 })
      .sort({ [sort]: -1 })
      .skip(page * limit)
      .limit(limit)
  },
  countList: function (options) {
    let query = {}
    if (typeof options.search !== 'undefined') {
      if (typeof options.search === 'string' && options.search.trim() !== '') {
        if (['name', 'username'].includes(options.item)) {
          // 模糊匹配
          query[options.item] = { $regex: new RegExp(options.search) }
          // =》 { name: { $regex: /admin/ } } => mysql like %admin%
        } else {
          // radio
          query[options.item] = options.search
        }
      }
      if (options.item === 'roles') {
        query = { roles: { $in: options.search } }
      }
      if (options.item === 'created') {
        const start = options.search[0]
        const end = options.search[1]
        query = { created: { $gte: new Date(start), $lt: new Date(end) } }
      }
    }
    return this.find(query).countDocuments()
  },
  getTotalSign: function (page, limit) {
    return this.find({ count: { $gt: 0 } })
      .skip(page * limit)
      .limit(limit)
      .sort({ count: -1 })
  },
  getTotalSignCount: function (page, limit) {
    return this.find({ count: { $gt: 0 } }).countDocuments()
  },
  getFavs: function (uid) { // 查询用户积分
    return this.findOne({ _id: uid }, { favs: 1 }).then(res => {
      return res.favs
    })
  },
  // 通过 unionid 查找用户，如果没有找到就创建一个
  findOrCreateByUnionid: function (wxUserInfo) {
    return this.findOne({ unionid: wxUserInfo.unionId }, { unionid: 0, password: 0 }).then(user => {
      return user || this.create({
        openid: wxUserInfo.openId,
        unionid: wxUserInfo.unionId,
        username: getTempName() + '@toimc.com',
        name: wxUserInfo.nickName,
        roles: ['user'],
        gender: wxUserInfo.gender,
        pic: wxUserInfo.avatarUrl,
        location: wxUserInfo.city
      })
    })
  },
  // 取得签到次数最多的用户
  findTotalSign: function () {
    return this.find(
      { count: { $gte: 1 } },
      {
        password: 0,
        organs: 0,
        roles: 0,
        location: 0,
        gender: 0,
        regmark: 0
      }
    )
      .sort({ count: -1 })
      .limit(20)
  },
  queryCount: function (options) {
    return this.find(options).countDocuments()
  },
  updateMobile: function (uid, phone) {
    return this.updateOne({ _id: uid }, { mobile: phone })
  },
  updateEmail: function (uid, email) {
    return this.updateOne({ _id: uid }, { username: email })
  }
}

const UserModel = mongoose.model('users', UserSchema)

export default UserModel
