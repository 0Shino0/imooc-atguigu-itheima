const { redis } = require('./redis')
const Service = require('egg').Service
class RedishotService extends Service {
  async hotInc(videoId, incNum) {
    var data = await redis.zscore('videohots', videoId)
    if (data) {
      await redis.zincrby('videohots', incNum, videoId)
    } else {
      await redis.zadd('videohots', incNum, videoId)
    }
  }

  async tophots(num) {
    var tops = await redis.zrevrange('videohots', 0, -1, 'withscores')
    var newarr = tops.slice(0, num * 2)
    var obj = {}
    for (let i = 0; i < newarr.length; i++) {
      if (i % 2 == 0) {
        obj[newarr[i]] = newarr[i + 1]
      }
    }
    return obj
  }
}
module.exports = RedishotService