import config from '@/config'
import log4js from '@/config/Log4j'
import { setValue, initRedis } from '@/config/RedisConfig'
import User from '@/model/User'
import { wxGetAccessToken } from '../common/WxUtils'
const logger = log4js.getLogger('out')

export const run = async () => {
  await initRedis()
  const result = await wxGetAccessToken()
  logger.info('new accessToken: ' + result)
  if (config.adminEmail && config.adminEmail.length > 0) {
    const emails = config.adminEmail
    const arr = []
    for (let email of emails) {
      const user = await User.findOne({ username: email })
      arr.push(user._id)
    }
    await setValue('admin', JSON.stringify(arr))
  }
}
