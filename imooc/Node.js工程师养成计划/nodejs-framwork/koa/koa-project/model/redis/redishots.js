const { redis } = require('./index')

// 视频热度增长
module.exports.hotInc = async (videoId, incNum) => {
  var data = await redis.zscore('videohots',videoId)
  if(data){
    await redis.zincrby('videohots',incNum,videoId)
  }else{
    await redis.zadd('videohots',incNum,videoId)
  }
}

// 获取热度排名
module.exports.tophots = async (num)=>{
  var paixu = await redis.zrevrange('videohots',0,-1,'withscores')
  var newarr = paixu.slice(0,num*2)
  var obj = {}
  for(let i=0;i<newarr.length;i++){
    if(i%2 === 0 ){
      obj[newarr[i]] = newarr[i+1]
    }
  }
  return obj
}
