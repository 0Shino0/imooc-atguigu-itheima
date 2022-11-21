const Redis = require('ioredis')
const redis = new Redis(6379,'192.168.0.106',{password:'root'})
redis.set('mykey','value')
redis.keys('*').then(res=>{
  console.log(res);
})
