const fs = require('fs')
const { promisify } = require('util')
const lodash = require('lodash')
const { User, Subscribe } = require('../model/index')
const { createToken } = require('../util/jwt')
const rename = promisify(fs.rename)

exports.getchannel = async (req,res)=>{
  let channelList = await Subscribe.find({
    channel:req.user.userinfo._id
  }).populate('user')
  channelList = channelList.map(item=>{
    return lodash.pick(item.user,[
      '_id',
      'username',
      'image',
      'subscribeCount',
      'cover',
      'channeldes'
    ])
  })
  res.status(200).json(channelList)
}

exports.getsubscribe = async (req,res)=>{
  let subscribeList = await Subscribe.find({
    user:req.params.userId
  }).populate('channel')
  subscribeList = subscribeList.map(item=>{
    return lodash.pick(item.channel,[
      '_id',
      'username',
      'image',
      'subscribeCount',
      'cover',
      'channeldes'
    ])
  })
  res.status(200).json(subscribeList)
}


exports.getuser = async (req,res)=>{

  var isSubscribe = false

  if(req.user){
    const record = await Subscribe.findOne({
      channel:req.params.userId,
      user:req.user.userinfo._id
    })
    if(record){
      isSubscribe = true
    }
  }

  const user = await User.findById(req.params.userId)
  // user.isSubscribe = isSubscribe
  res.status(200).json({
    ...lodash.pick(user,[
      '_id',
      'username',
      'image',
      'subscribeCount',
      'cover',
      'channeldes'
    ]),
    isSubscribe
  })

}


exports.unsubscribe = async (req,res)=>{
  const userId = req.user.userinfo._id
  const channelId = req.params.userId
  if (userId === channelId) {
    return res.status(401).json({ err: '不能取消关注自己' })
  }

  const record = await Subscribe.findOne({
    user: userId,
    channel: channelId
  })

  
  if (record) {
    await record.remove()
    const user = await User.findById(channelId)
    user.subscribeCount--
    await user.save()
    res.status(200).json(user)
  } else {
    res.status(401).json({ err: "没有订阅了此频道" })
  } 

}

// 关注频道
exports.subscribe = async (req, res) => {
  const userId = req.user.userinfo._id
  const channelId = req.params.userId
  if (userId === channelId) {
    return res.status(401).json({ err: '不能关注自己' })
  }

  const record = await Subscribe.findOne({
    user: userId,
    channel: channelId
  })

  if (!record) {
    await new Subscribe({
      user: userId,
      channel: channelId
    }).save()

    const user = await User.findById(channelId)
    user.subscribeCount++
    await user.save()
    res.status(200).json({ msg: "关注成功" })
  } else {
    res.status(401).json({ err: "已经订阅了此频道" })
  } 
}

// 用户注册
exports.register = async (req, res) => {
  // console.log(req.body)
  // return
  const userModel = new User(req.body)
  const dbBack = await userModel.save()
  user = dbBack.toJSON()
  delete user.password
  res.status(201).json({
    user
  })
}

// 用户登录
exports.login = async (req, res) => {
  // 客户端数据验证
  // 链接数据库查询
  var dbBack = await User.findOne(req.body)
  if (!dbBack) {
    res.status(402).json({ error: "邮箱或者密码不正确" })
  }

  dbBack = dbBack.toJSON()
  dbBack.token = await createToken(dbBack)
  res.status(200).json(dbBack)
}

// 用户修改
exports.update = async (req, res) => {
  var id = req.user.userinfo._id
  var dbBack = await User.findByIdAndUpdate(id, req.body, { new: true })
  // console.log(updateData);
  res.status(202).json({ user: dbBack })
}

// 用户头像上传
exports.headimg = async (req, res) => {
  console.log(req.file);
  // {
  //   fieldname: 'headimg',
  //   originalname: 'mon.ica.jpg',
  //   encoding: '7bit',
  //   mimetype: 'image/jpeg',
  //   destination: 'public/',
  //   filename: '2c715b8b8c9b5786aa423ebcd9f1d983',
  //   path: 'public\\2c715b8b8c9b5786aa423ebcd9f1d983',
  //   size: 161264
  // }
  var fileArr = req.file.originalname.split('.')
  var filetype = fileArr[fileArr.length - 1]
  // console.log(filetype);

  try {
    await rename(
      './public/' + req.file.filename,
      './public/' + req.file.filename + '.' + filetype
    )
    res.status(201).json({ filepath: req.file.filename + '.' + filetype })
  } catch (error) {
    res.status(500).json({ err: error })
  }

}

exports.list = async (req, res) => {
  console.log(req.user);
  // JSON.parse('(')
  res.send('/user-list')
}

exports.delete = async (req, res) => {

}
