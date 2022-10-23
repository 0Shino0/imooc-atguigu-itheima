import WebSocketClient from '@/utils/websocket'
import { INIT_WEBSOCKET } from '@/store/mutation-types'

export default {
  state: {
    ws: null
  },
  mutations: {
    [INIT_WEBSOCKET] (state, config) {
      state.ws = new WebSocketClient(config)
      state.ws.init()
    }
  }
}
