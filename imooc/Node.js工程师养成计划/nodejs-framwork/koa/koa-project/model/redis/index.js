const Redis = require('ioredis')
const { redisClient } = require('../../config/config.default')
const redis = new Redis(redisClient.port, redisClient.path, redisClient.options)
redis.on('error',err=>{
  console.log(err);
  redis.quit()
})

redis.on('ready',()=>{
  console.log('Redis 链接成功');
})

module.exports.redis = redis