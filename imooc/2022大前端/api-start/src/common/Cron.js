// 每隔7200秒执行一次 刷新accessToken
import { CronJob } from 'cron'
import { wxGetAccessToken } from './WxUtils'

// Seconds: 0-59
// Minutes: 0-59
// Hours: 0-23
// Day of Month: 1-31
// Months: 0-11 (Jan-Dec)
// Day of Week: 0-6 (Sun-Sat)
const job = new CronJob('0 0 */1 * * *', async () => {
  await wxGetAccessToken(true)
})

job.start()
