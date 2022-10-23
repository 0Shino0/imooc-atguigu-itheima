import QcloudSms from 'qcloudsms_js'

const cfg = {
  appid: 1400551500,
  appkey: 'add205f0f1d110d5b88869284af8671f',
  templateId: 1050474,
  smsSign: 'toimc前端技术'
}

export default (phone, code, time = 10) => {
  return new Promise((resolve, reject) => {
    phone = phone instanceof Array ? phone : [phone]
    // 实例化QcloudSms
    const qcloudsms = QcloudSms(cfg.appid, cfg.appkey)
    const ssender = qcloudsms.SmsSingleSender()
    ssender.sendWithParam(
      '86',
      phone,
      cfg.templateId,
      [code, time],
      cfg.smsSign,
      '',
      '',
      (err, res, resData) => {
        if (err) {
          console.log('err: ', err)
          reject(err)
        } else {
          console.log('request data: ', res.req)
          console.log('response data: ', resData)
          resolve(resData)
        }
      }
    ) // 签名参数不能为空串
  })
}
