const Redis = require('ioredis')
const { redisClient } = require('../../config/config.default')

const redis = new Redis(redisClient.port, redisClient.path, redisClient.options)
redis.on('error', err => {
  if (err) {
    console.log('Redis链接错误');
    console.log(err);
    redis.quit()
  }
})

redis.on('ready', () => {
  console.log('Redis链接成功');
})

exports.redis = redis
