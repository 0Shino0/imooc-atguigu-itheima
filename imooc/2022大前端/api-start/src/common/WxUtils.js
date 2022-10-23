// 记录微信相关的接口， API项目 -> 微信官方服务器
import config from '@/config'
import log4js from '@/config/Log4j'
import { getValue, setValue } from '@/config/RedisConfig'
import axios from 'axios'
import crypto from 'crypto'
import del from 'del'
import FormData from 'form-data'
import fs, { accessSync, constants } from 'fs'
import mkdir from 'make-dir'
import path from 'path'
import qs from 'qs'
import sharp from 'sharp'
import { v4 as uuidv4 } from 'uuid'
import WXBizDataCrypt from './WXBizDataCrypt'

const logger = log4js.getLogger('error')

const instance = axios.create({
  timeout: 10000
})

instance.interceptors.response.use(async (res) => {
  const { data } = res
  if (data.errcode === 40001) {
    // 重新获取新的accessToken
    const accessToken = await wxGetAccessToken(true)
    const { url } = res.config
    // 重新发起请求 -> res
    if (url.indexOf('access_token') !== -1) {
      const arr = url.split('?') // ?key=value&key1=value1... -> ['域名', 'key=value&key1=value1...']
      const params = qs.parse(arr[1])
      const newParams = {
        ...params,
        access_token: accessToken
      }
      const newUrl = arr[0] + '?' + qs.stringify(newParams)
      const config = { ...res.config, url: newUrl }
      const result = await axios(config)
      return result
    }
  }
  return res
})

// 获取session_key，openid 等OpenData数据
export const wxGetOpenData = async (code) => {
  // sessin_key, openid, unoinid
  const res = await instance.get(`https://api.weixin.qq.com/sns/jscode2session?appid=${config.AppID}&secret=${config.AppSecret}&js_code=${code}&grant_type=authorization_code`)
  // console.log('🚀 ~ file: WxUtils.js ~ line 11 ~ wxGetOpenData ~ res', res)
  return res.data
}

// 获取解密用户的信息
export const wxGetUserInfo = async (user, code) => {
  // 1.获取用户的openData -> session_key
  const data = await wxGetOpenData(code)
  const { session_key: sessionKey } = data
  if (sessionKey) {
    // 2.用户数据进行签名校验 -> sha1 -> session_key + rawData + signature
    const { rawData, signature, encryptedData, iv } = user
    const sha1 = crypto.createHash('sha1')
    sha1.update(rawData)
    sha1.update(sessionKey)
    if (sha1.digest('hex') !== signature) {
      // 校验失败
      return Promise.reject(
        new Error({
          code: 500,
          msg: '签名校验失败'
        })
      )
    }
    const wxBizDataCrypt = new WXBizDataCrypt(config.AppID, sessionKey)
    // 3.用户加密数据的解密
    const userInfo = wxBizDataCrypt.decryptData(encryptedData, iv)
    return { ...userInfo, ...data, errcode: 0 }
  } else {
    // data -> errcode非0 ，请求失败
    return data
  }
}

// 获取微信accessToken
// flag 强制刷新，默认false - 不强制刷新
export const wxGetAccessToken = async (flag = false) => {
  // https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=APPID&secret=APPSECRET
  // 1.判断redis中是否有accessToken
  // 2.有 & flag -> 则直接返回
  // 3.没有 -> 请求新的token
  let accessToken = await getValue('accessToken')
  if (!accessToken || flag) {
    try {
      const result = await instance.get(`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${config.AppID}&secret=${config.AppSecret}`)
      // console.log('🚀 ~ file: WxUtils.js ~ line 60 ~ wxGetAccessToken ~ result', result)
      if (result.status === 200) {
        await setValue('accessToken', result.data.access_token, result.data.expires_in)
        accessToken = result.data.access_token
        if (result.data.errcode && result.data.errmsg) {
          logger.error(`wxGetAccessToken error${result.data.errcode} - ${result.data.errmsg}`)
        }
      }
    } catch (error) {
      logger.error(`wxGetAccessToken error: ${error.message}`)
    }
  }
  return accessToken
}

// 发送订阅消息
export const wxSendMessage = async (options) => {
  // POST https://api.weixin.qq.com/cgi-bin/message/subscribe/send?access_token=ACCESS_TOKEN
  let accessToken = await wxGetAccessToken()
  try {
    const { data } = await instance.post(`https://api.weixin.qq.com/cgi-bin/message/subscribe/send?access_token=${accessToken}`, options)
    return data
  } catch (error) {
    logger.error(`wxSendMessage error: ${error.message}`)
  }
}

// 文本内容安全
// content - 内容
// title - 标题 可选
// signature - 签名 也是可选
export const wxMsgCheck = async (content, {
  user: {
    openid,
    name: nickname,
    remark: signature
  },
  scene,
  title
} = {
  user: {},
  scene: 3,
  title: ''
}) => {
  // POST https://api.weixin.qq.com/wxa/msg_sec_check?access_token=ACCESS_TOKEN
  let accessToken = await wxGetAccessToken()
  let res
  try {
    // 1.过滤掉一些如Html，自定义的标签内容
    content = content.replace(/<[^>]+>/g, '').replace(/\sface\[\S{1,}]/g, '').replace(/img\[\S+\]/g, '').replace(/\sa\(\S+\]/g, '').replace(/\[\/?quote\]/g, '').replace(/\[\/?pre\]/g, '').replace(/\[\/?hr\]/g, '').replace(/[\r\n|\n|\s]/g, '')
    // 2.如果content内容超过了2500词，需要进行分段处理
    if (content.length > 2500) {
      // 分段 —> arr -> method1: for , method2: reg
      let arr = content.match(/[\s\S]{1,2500}/g) || []
      // 多次请求接口
      let mulResult = []
      for (let i = 0; i < arr.length; i++) {
        // 获取所有接口的返回结果 -> 结果判断 -> 返回
        res = await instance.post(`https://api.weixin.qq.com/wxa/msg_sec_check?access_token=${accessToken}`, {
          version: 2,
          openid: openid || 'ooTjn5YPpogMWLtEQ_PxyUJkIp2I',
          scene,
          content: arr[i],
          nickname: nickname,
          title,
          signature: scene === 1 ? signature : null
        })
        mulResult.push(res)
      }
      // 判断mulResult
      console.log(mulResult)
      const arrTemp = mulResult.filter(item => {
        const { status, data: { errcode, result } } = item
        return status !== 200 || errcode !== 0 || (result && result.suggest !== 'pass')
      })
      return !(arrTemp.length > 0)
    } else {
      res = await instance.post(`https://api.weixin.qq.com/wxa/msg_sec_check?access_token=${accessToken}`, {
        version: 2,
        openid: openid || 'ooTjn5YPpogMWLtEQ_PxyUJkIp2I',
        scene,
        content,
        nickname: nickname,
        title,
        signature: scene === 1 ? signature : null
      })
      const { status, data: { errcode, result } } = res
      return status === 200 && errcode === 0 && result && result.suggest === 'pass'
      // if (status === 200 && errcode === 0 && result && result.suggest === 'pass') {
      //   // 正常
      //   return true
      // } else {
      //   // 异常
      //   return false
      // }
    }
  } catch (error) {
    logger.error(`wxMsgCheck error: ${error.message}`)
  }
}

export const getHeaders = (form) => {
  return new Promise((resolve, reject) => {
    form.getLength((err, length) => {
      if (err) {
        reject(err)
      }
      const headers = Object.assign({
        'Content-Length': length
      }, form.getHeaders())
      resolve(headers)
    })
  })
}

export const checkAndDelFile = async (path) => {
  try {
    accessSync(path, constants.R_OK | constants.W_OK)
    await del(path)
  } catch (err) {
    // console.error('no access!')
  }
}

// 图片内容安全
export const wxImgCheck = async (file) => {
  // POST https://api.weixin.qq.com/wxa/img_sec_check?access_token=ACCESS_TOKEN
  const accessToken = await wxGetAccessToken()
  // 1.保证图片 -> 判断分辨率 -> sharp 750 * 1334
  let newPath = file.path
  const tmpPath = path.resolve('./tmp')
  try {
    const img = sharp(newPath)
    const meta = await img.metadata()
    if (meta.width > 750 || meta.height > 1334) {
      // 判断临时路径是否存在，并创建
      await mkdir(tmpPath)
      // uuid -> 指定临时的文件名称
      newPath = path.join(tmpPath, uuidv4() + path.extname(newPath) || '.jpg')
      await img.resize(750, 1334, {
        fit: 'inside'
      }).toFile(newPath)
    }
    const stream = fs.createReadStream(newPath)
    // 2.FormData类型的数据准备
    const form = new FormData()
    form.append('media', stream)
    const headers = await getHeaders(form)
    // 3.请求接口 -> 返回结果
    const result = await instance.post(`https://api.weixin.qq.com/wxa/img_sec_check?access_token=${accessToken}`, form, { headers })
    // 校验成功 -> 删除tmp数据 -> 判断路径中的文件是否存在
    console.log('🚀 ~ file: WxUtils.js ~ line 232 ~ wxImgCheck ~ result', result)
    await checkAndDelFile(newPath)
    return result.status === 200 && result.data && result.data.errcode === 0
    // if (result.status === 200 && result.data && result.data.errcode === 0) {
    //   // errcode 0 - 内容正常，否则 - 异常
    //   return true
    // } else {
    //   return false
    // }
  } catch (error) {
    await checkAndDelFile(newPath)
    logger.error(`wxImgCheck error: ${error.message}`)
  }
}
