// https://api.weixin.qq.com/sns/oauth2/access_token?appid=APPID&secret=SECRET&code=CODE&grant_type=authorization_code

import axios from 'axios'
import log4js from '@/config/Log4j'

const AppID = 'wx0af81b0d697d9db0'
const SECRET = 'dc50054de5c326660527929553ecc827'
const logger = log4js.getLogger('error')

// 网页应用扫码登录获取acccessToken
export const getOauth2AccessToken = async (code) => {
  const url = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${AppID}&secret=${SECRET}&code=${code}&grant_type=authorization_code`
  try {
    const res = await axios.get(url)
    if (res && res.status === 200) {
      const { data } = res
      return data
    }
    return res
  } catch (error) {
    logger.error(`getOauth2AccessToken error: ${error.message}`)
  }
}

// 获取用户的开放信息
export const getOpenDataByOpenId = async (accessToken, openId) => {
  // https://api.weixin.qq.com/sns/userinfo?access_token=ACCESS_TOKEN&openid=OPENID
  const url = `https://api.weixin.qq.com/sns/userinfo?access_token=${accessToken}&openid=${openId}`
  try {
    const res = await axios.get(url)
    if (res && res.status === 200) {
      const { data } = res
      return data
    }
    return res
  } catch (error) {
    logger.error(`getOpenDataByOpenId error: ${error.message}`)
  }
}
