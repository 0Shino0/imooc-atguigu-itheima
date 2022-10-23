import { createClient } from 'redis'
import config from './index'
import retryStrategy from 'node-redis-retry-strategy'

const options = {
  password: config.REDIS.password,
  socket: {
    host: config.REDIS.host,
    port: config.REDIS.port,
    detect_buffers: true,
    reconnectStrategy: retryStrategy()
  }
}

const client = createClient(options)

const initRedis = async () => {
  client.on('error', (err) => console.log('Redis Client Error', err))
  await client.connect()

  client.on('end', function () {
    console.log('redis connection has closed')
  })

  client.on('reconnecting', function (o) {
    console.log('redis client reconnecting', o.attempt, o.delay)
  })
}

const setValue = async (key, value, time) => {
  if (typeof value === 'undefined' || value == null || value === '') {
    return
  }
  if (typeof value === 'string') {
    if (typeof time !== 'undefined') {
      await client.set(key, value, 'EX', time)
    } else {
      await client.set(key, value)
    }
  } else if (typeof value === 'object') {
    // { key1: value1, key2: value2}
    // Object.keys(value) => [key1, key2]
    for (let i = 0; i < Object.keys(value).length; i++) {
      const item = Object.keys(value)[i]
      await client.hset(key, item, value[item], console.log)
    }
  }
}

// const {promisify} = require('util');
// const getAsync = promisify(client.get).bind(client);

const getValue = async (key) => {
  return await client.get(key)
}

const getHValue = async (key) => {
  // v8 Promisify method use util, must node > 8
  // return promisify(client.hgetall).bind(client)(key)

  // bluebird async
  return await client.hgetall(key)
}

const delValue = (key) => {
  client.del(key, (err, res) => {
    if (res === 1) {
      console.log('delete successfully')
    } else {
      console.log('delete redis key error:' + err)
    }
  })
}

export {
  client,
  setValue,
  getValue,
  getHValue,
  delValue,
  initRedis
}
