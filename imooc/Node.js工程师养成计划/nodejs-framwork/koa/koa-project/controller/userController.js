const { User, Subscribe } = require('../model')
const { createToken } = require('../util/jwt')

module.exports.subscribeList = async ctx=>{
  const userid = ctx.user.userInfo._id
  var subList = await Subscribe.find({user:userid}).populate('channel',[
    "username",
    "image",
    "channeldes",
    "subscribeCount"
  ])
  ctx.body = subList
}

// 关注频道
module.exports.subscribe = async ctx => {
  // console.log(ctx.user);

  const subscribeid = ctx.request.params.subscribeid
  const userid = ctx.user.userInfo._id
  if (subscribeid == userid) {
    return ctx.throw(403, '不能关注自己')
  }

  var subinfo = await Subscribe.findOne({
    user: userid,
    channel: subscribeid
  })
  if (subinfo) {
    return ctx.throw(403, '已经关注了')
  }

  var sub = new Subscribe({
    user: userid,
    channel: subscribeid
  })
  var subDb = await sub.save()
  if (subDb) {
    var subcribeUser = await User.findById(subscribeid, [
      "username",
      "image",
      "cover",
      "channeldes",
      "subscribeCount"
    ])

    subcribeUser.subscribeCount++
    await subcribeUser.save()
    ctx.body = subcribeUser
  } else {
    ctx.throw(501, '关注失败')
  }


}


// 获取用户信息
module.exports.getuser = async ctx => {
  const userid = ctx.request.params.userid
  const registerUserid = ctx.user ? ctx.user.userInfo._id : null
  var isSubcribed = false
  if (registerUserid) {
    const subscribe = await Subscribe.findOne({
      user: registerUserid,
      channel: userid
    })
    if (subscribe) {
      isSubcribed = true
    }
  }

  var userInfoDb = await User.findById(userid, [
    "username", "image",
    "cover",
    "channeldes"
  ])
  var userinfo = userInfoDb._doc
  userinfo.isSubcribed = isSubcribed
  ctx.body = userinfo
}

// 用户登录
module.exports.login = async ctx => {
  var dbback = await User.findOne(ctx.request.body)
  if (!dbback) {
    return ctx.throw(402, "邮箱或者密码不正确")
  }
  var token = await createToken(dbback._doc)
  dbback._doc.token = token
  ctx.body = dbback._doc

}

// 用户注册
module.exports.register = async ctx => {
  // console.log(ctx.request.body);
  const userModel = new User(ctx.request.body)
  const dbBack = await userModel.save()
  ctx.body = dbBack
}

module.exports.index = async (ctx, next) => {
  var user = await User.findById(ctx.params.userId)
  ctx.body = user
}