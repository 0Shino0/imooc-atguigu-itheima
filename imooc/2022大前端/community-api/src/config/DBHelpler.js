import mongoose from 'mongoose'
import config from './index'

mongoose.set('useCreateIndex', true)
// mongoose.set('debug', true)

// 创建连接
mongoose.connect(config.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

// 连接成功
mongoose.connection.on('connected', () => {
  console.log(`MongoDB: ${config.DB_NAME}, DB_HOST: ${config.MONGO_HOSTNAME} connection opened! `)
})

// 连接异常
mongoose.connection.on('error', (err) => {
  console.log('Mongoose connection error: ' + err)
})

// 断开连接
mongoose.connection.on('disconnected', () => {
  console.log('Mongoose connection disconnected')
})

export default mongoose
