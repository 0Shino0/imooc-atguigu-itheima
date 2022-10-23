import { CronJob } from 'cron'
import { wxGetAccessToken } from './WxUtils'

const job = new CronJob('* 55 */1 * * *', () => {
  wxGetAccessToken()
})

job.start()
