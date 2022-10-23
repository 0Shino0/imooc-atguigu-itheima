import config from '@/config'
import dayjs from 'dayjs'
import axios from 'axios'
import log4js from '@/config/Log4j'
import rand from 'randomstring'
import crypto from 'crypto'
import fs from 'fs'
import path from 'path'
import qs from 'qs'

const logger = log4js.getLogger('error')

const instance = axios.create({
  timeout: 10000
})

export const rsaSign = (message) => {
  const keyPem = fs.readFileSync(
    path.join(__dirname, 'keys/apiclient_key.pem'),
    'utf-8'
  )
  const signature = crypto
    .createSign('RSA-SHA256')
    .update(message, 'utf-8')
    .sign(keyPem, 'base64')
  return signature
}

// 解密aes数据
// const apiV3Key = '*******' // 设置的 API V3 密钥

export const decryptByApiV3 = ({
  associate, // 加密参数 - 类型
  nonce, // 加密参数 - 随机数
  ciphertext // 加密密文
} = {}) => {
  ciphertext = decodeURIComponent(ciphertext)
  ciphertext = Buffer.from(ciphertext, 'base64')

  const authTag = ciphertext.slice(ciphertext.length - 16)
  const data = ciphertext.slice(0, ciphertext.length - 16)

  const decipher = crypto.createDecipheriv(
    'aes-256-gcm',
    config.apiV3Key,
    nonce
  )
  decipher.setAuthTag(authTag)
  decipher.setAAD(Buffer.from(associate))

  let decryptedText = decipher.update(data, null, 'utf8')
  decryptedText += decipher.final()
  return decryptedText
}

export const getSignHeaders = (url, method, body) => {
  // HTTP请求方法\n
  // URL\n  https://www.imooc.com/path1/path2/?query1=value
  // 请求时间戳\n
  // 请求随机串\n
  // 请求报文主体\n
  const tmpUrl = new URL(url)
  const nonceStr = rand.generate(16)
  const pathname = /http/.test(url) ? tmpUrl.pathname : url
  const timestamp = Math.floor(Date.now() / 1000)
  const message = `${method.toUpperCase()}\n${pathname + tmpUrl.search
    }\n${timestamp}\n${nonceStr}\n${body ? JSON.stringify(body) : ''}\n`
  // const keyPem = fs.readFileSync(path.join(__dirname, 'keys/apiclient_key.pem'), 'utf-8')
  // const signature = crypto.createSign('RSA-SHA256').update(message, 'utf-8').sign(keyPem, 'base64')
  const signature = rsaSign(message)
  // 1.解决问题：windows上无openssl -> lw96/libressl
  // 2.需要传递apiclient_key.pem给镜像 -> 因为只有在容器里面才能执行openssl
  // 3.method1: docker cp  method2: -v
  // 4.使用openssl进行签名 -> 对比crypto产生的base64串

  return {
    headers: `WECHATPAY2-SHA256-RSA2048 mchid="${config.mchid}",nonce_str="${nonceStr}",signature="${signature}",timestamp="${timestamp}",serial_no="${config.serialNo}"'`,
    nonceStr,
    timestamp
  }
}

export const getTradeNo = () => {
  // 服务端侧：out_trade_no -> 订单号 -> timestamp + type + id
  // 1.Date.now()  2.Moment/dayjs
  // 2. 01-小程序
  return (
    dayjs().format('YYYYMMDDHHmmssSSS') +
    '01' +
    Math.random().toString().substr(-10)
  )
}

export const wxJSPAY = async (params) => {
  const {
    description,
    goodsTag,
    total,
    user: { openid },
    detail,
    sceneInfo,
    settleInfo
  } = params
  // https://api.mch.weixin.qq.com/v3/pay/transactions/jsapi
  // 小程序用户侧： description，amount:{total} -> token -> id -> openid

  const wxParams = {
    appid: config.AppID,
    mchid: config.mchid,
    description,
    out_trade_no: getTradeNo(),
    time_expire: dayjs().add(30, 'm').format(),
    attach: '',
    notify_url: 'https://test1.toimc.com/public/notify',
    goods_tag: goodsTag,
    amount: {
      total: parseInt(total),
      currency: 'CNY'
    },
    payer: {
      openid
    },
    detail,
    scene_info: sceneInfo,
    settle_info: settleInfo
  }
  const url = 'https://api.mch.weixin.qq.com/v3/pay/transactions/jsapi'
  const { headers, nonceStr, timestamp } = getSignHeaders(
    url,
    'post',
    wxParams
  )
  try {
    const result = await instance.post(url, wxParams, {
      headers: {
        Authorization: headers
      }
    })
    console.log('🚀 ~ file: WxPay.js ~ line 53 ~ wxJSPAY ~ result', result)
    const { status, data } = result
    if (status === 200) {
      return { prepayId: data.prepay_id, nonceStr, timestamp }
    } else {
      logger.error(`wxJSPAY error: ${result}`)
    }
  } catch (error) {
    logger.error(`wxJSPAY error: ${error.message}`)
  }
}

// 微信支付订单查询 out_trade_no
//  https://api.mch.weixin.qq.com/v3/pay/transactions/out-trade-no/{out_trade_no}
export const getNofityByTradeNo = async (id) => {
  try {
    let url = `https://api.mch.weixin.qq.com/v3/pay/transactions/out-trade-no/${id}?`
    const params = {
      mchid: config.mchid
    }
    url += qs.stringify(params)
    const { headers, nonceStr, timestamp } = getSignHeaders(url, 'get')
    const result = await instance.get(url, {
      headers: {
        Authorization: headers
      }
    })
    console.log(
      '🚀 ~ file: WxPay.js ~ line 147 ~ getNofityByTradeNo ~ timestamp',
      timestamp
    )
    console.log(
      '🚀 ~ file: WxPay.js ~ line 147 ~ getNofityByTradeNo ~ nonceStr',
      nonceStr
    )
    console.log('🚀 ~ file: WxPay.js ~ line 53 ~ wxJSPAY ~ result', result)
    // todo result.data -> trade_state trade_type -> 存储订单的其他信息
  } catch (error) {
    logger.error(`getNofityByTradeNo error: ${error.message}`)
  }
}
