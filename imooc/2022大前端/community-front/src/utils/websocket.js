import store from '@/store'
import config from '@/config'
class WebSocketClient {
  constructor (confg = {}) {
    const defautConfig = {
      url: config.wsconfig.url,
      port: config.wsconfig.port,
      protocol: 'ws',
      timeInterval: 5 * 1000
    }
    const finalConfig = { ...defautConfig, ...confg }
    this.ws = {}
    this.port = finalConfig.port
    this.url = finalConfig.url
    this.protocol = finalConfig.protocol
    this.handle = null
    this.timeInterval = finalConfig.timeInterval
  }

  init () {
    this.ws = new WebSocket(`${this.protocol}://${this.url}:${this.port}`)
    this.ws.onopen = () => this.onOpen()
    this.ws.onmessage = (msg) => this.onMessage(msg)
    this.ws.onclose = () => this.onClose()
    this.ws.onerror = () => this.onError()
  }

  send (msg) {
    this.ws.send(msg)
  }

  onOpen () {
    this.send(JSON.stringify({
      event: 'auth',
      message: 'Bearer ' + store.state.token
    }))
  }

  onMessage (event) {
    // 当用户未进入聊天室，则不接收消息
    if (this.isShow) {
      return
    }
    // 接收服务端发送过来的消息
    var obj = JSON.parse(event.data)
    switch (obj.event) {
      case 'noauth':
        // 鉴权失败
        // 路由跳转到 /login 重新获取token
        break
      case 'heartbeat':
        this.checkServer() // timeInterval + t
        // 可以注释掉以下心跳状态，主动测试服务端是否会断开客户端的连接
        this.ws.send(JSON.stringify({
          event: 'heartbeat',
          message: 'pong'
        }))
        break
      default:
        store.dispatch(obj.event, obj)
    }
  }
  onClose () {
    // 当链接主动断开的时候触发close事件
    this.ws.close()
  }
  onError () {
    // 当连接失败时，触发error事件
    // 连接失败之后，1s进行断线重连！
    setTimeout(() => {
      this.init()
    }, 500)
  }

  checkServer () {
    clearTimeout(this.handle)
    this.handle = setTimeout(() => {
      this.onClose()
      this.onError()
    // 设置1ms的时延，调试在服务器测未及时响应时，客户端的反应
    }, this.timeInterval + 1000)
  }
}

export default WebSocketClient
