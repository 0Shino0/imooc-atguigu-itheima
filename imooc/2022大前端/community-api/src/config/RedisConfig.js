import redis from 'redis'
import { promisifyAll } from 'bluebird'
import config from './index'
// import log4js from '@/config/Log4j'

// const logger = log4js.getLogger('out')

const options = {
  host: config.REDIS.host,
  port: config.REDIS.port,
  password: config.REDIS.password,
  no_ready_check: true,
  detect_buffers: true,
  retry_strategy: function (options) {
    if (options.error && options.error.code === 'ECONNREFUSED') {
      // End reconnecting on a specific error and flush all commands with
      // a individual error
      return new Error('The server refused the connection')
    }
    if (options.total_retry_time > 1000 * 60 * 60) {
      // End reconnecting after a specific timeout and flush all commands
      // with a individual error
      return new Error('Retry time exhausted')
    }
    if (options.attempt > 10) {
      // End reconnecting with built in error
      console.log('already tried 10 times!')
      return undefined
    }
    // reconnect after
    return Math.min(options.attempt * 100, 3000)
  }
}

// const client = redis. createClient(options)
let client = promisifyAll(redis.createClient(options))

client.on('error', (err) => {
  console.log('Redis Client Error:' + err)
})

const setValue = (key, value, time) => {
  if (!client.connected) {
    client = promisifyAll(redis.createClient(options))
  }
  if (typeof value === 'undefined' || value == null || value === '') {
    return
  }
  if (typeof value === 'string') {
    if (typeof time !== 'undefined') {
      client.set(key, value, 'EX', time, (err, result) => {
        console.log('client.set -> err', err)
      })
      // client.set(key, value);
      // client.expire(key, time);
    } else {
      client.set(key, value)
    }
  } else if (typeof value === 'object') {
    // { key1: value1, key2: value2}
    // Object.keys(value) => [key1, key2]
    Object.keys(value).forEach((item) => {

    })
  }
  // client.quit()
}

// const {promisify} = require('util');
// const getAsync = promisify(client.get).bind(client);

const getValue = (key) => {
  if (!client.connected) {
    client = promisifyAll(redis.createClient(options))
  }
  return client.getAsync(key)
}

const getHValue = (key) => {
  // v8 Promisify method use util, must node > 8
  // return promisify(client.hgetall).bind(client)(key)

  // bluebird async
  return client.hgetallAsync(key)
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

export { client, setValue, getValue, getHValue, delValue }
