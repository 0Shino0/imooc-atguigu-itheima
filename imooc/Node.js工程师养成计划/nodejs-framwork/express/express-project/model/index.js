const mongoose = require('mongoose')
const {mongopath}  = require('../config/config.default')
async function mian (){
  await mongoose.connect(mongopath)
}

mian()
.then(res=>{
  console.log('mongo链接成功');
})
.catch(err=>{
  console.log(err);
  console.log('mongo链接失败');
})

module.exports = {
  User:mongoose.model('User',require('./userModel')),
  Video:mongoose.model('Video',require('./videoModel')),
  Subscribe:mongoose.model('Subscribe',require('./subscribeModel')),
  Videocomment:mongoose.model('Videocomment',require('./videocommentModel')),
  Videolike:mongoose.model('Videolike',require('./videolikeModel')),
  collectModel:mongoose.model('CollectModel',require('./collectModel'))
}


