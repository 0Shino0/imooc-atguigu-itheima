import store from '@/store'
import { Message } from 'iview'

const addErrorLog = (errorInfo) => {
  const {
    statusText,
    status,
    request: { responseURL }
  } = errorInfo
  const info = {
    type: 'ajax',
    code: status,
    mes: statusText,
    url: responseURL
  }
  if (!responseURL.includes('save_error_logger')) {
    store.dispatch('addErrorLog', info)
  }
}
const errorHandle = (err) => {
  // console.log('TCL: errorHandle -> err', err)
  const { response } = err
  if (response && response.status === 401) {
    Message.error('您没有操作权限！')
  } else {
    Message.error(err.message || '操作异常！')
  }
  addErrorLog(err)
}

export default errorHandle
