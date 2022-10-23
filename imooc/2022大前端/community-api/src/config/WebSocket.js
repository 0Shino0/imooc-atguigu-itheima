import WebSocket from 'ws'
import { getJWTPayload } from '@/common/Utils'
import Comments from '@/model/Comments'
import configfile from './index'
//
class WebSocketServer {
  constructor (config = {}) {
    const defaultConfig = {
      port: configfile.wsPort,
      timeInterval: 5 * 1000,
      isAuth: true
    }
    // 最终配置
    const finalConfig = { ...defaultConfig, ...config }
    this.wss = {}
    this.timeInterval = finalConfig.timeInterval
    this.isAuth = finalConfig.isAuth
    this.port = finalConfig.port
    this.options = config.options || {}
  }

  // 初始化webscoekt服务
  init () {
    this.wss = new WebSocket.Server({ port: this.port, ...this.options })

    // 连接信息
    this.wss.on('connection', (ws) => {
      // 连接上之后随即发送一次心跳检测
      ws.isAlive = true
      ws.send(JSON.stringify({
        event: 'heartbeat',
        message: 'ping'
      }))
      ws.on('message', (msg) => this.onMessage(ws, msg))
      ws.on('close', () => this.onClose(ws))
    })

    // 心跳检测
    this.heartbeat()
  }

  onMessage (ws, msg) {
    // 用户鉴权 -> token -> _id
    // 心跳检测
    // 消息发送
    const msgObj = JSON.parse(msg)
    const events = {
      auth: async () => {
        try {
          const obj = await getJWTPayload(msgObj.message)
          if (obj) {
            ws.isAuth = true
            ws._id = obj._id
            const num = await Comments.getTotal(obj._id)
            ws.send(JSON.stringify({
              event: 'message',
              message: num
            }))
          }
        } catch (error) {
          ws.send(JSON.stringify({
            event: 'noauth',
            message: 'please auth again'
          }))
        }
      },
      heartbeat: () => {
        if (msgObj.message === 'pong') {
          ws.isAlive = true
        }
      },
      message: () => {
        // 鉴权拦截
        // if (!ws.isAuth && this.isAuth) {
        //   return
        // }
        // 消息广播
        // this.wss.clients.forEach((client) => {
        //   if (client.readyState === WebSocket.OPEN && client._id === ws._id) {
        //     this.send(msg)
        //   }
        // })
      }
    }
    events[msgObj.event]()
  }

  // 点对点的消息发送
  send (uid, msg) {
    this.wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN && client._id === uid) {
        client.send(msg)
      }
    })
  }

  // 广播消息 -> 推送系统消息
  broadcast (msg) {
    this.wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(msg)
      }
    })
  }

  onClose (ws) {

  }

  // 心跳检测
  heartbeat () {
    clearInterval(this.interval)
    this.interval = setInterval(() => {
      this.wss.clients.forEach((ws) => {
        if (!ws.isAlive) {
          return ws.terminate()
        }
        // 主动发送心跳检测请求
        // 当客户端返回了消息之后，主动设置flag为在线
        ws.isAlive = false
        ws.send(JSON.stringify({
          event: 'heartbeat',
          message: 'ping'
        }))
      })
    }, this.timeInterval)
  }
}

export default WebSocketServer
