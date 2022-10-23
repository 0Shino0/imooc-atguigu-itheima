import QcloudSms from 'qcloudsms_js'

const cfg = {
  appid: 1400273334, // SDK AppID 以1400开头
  appkey: 'f6a6135ba70aa2ec411bee9f43ca34b1', // 短信应用 SDK AppKey
  templateId: 448816, // 短信模板 ID，需要在短信控制台中申请
  smsSign: '为恩科技' // NOTE: 签名参数使用的是`签名内容`，而不是`签名ID`。这里的签名"腾讯云"只是示例，真实的签名需要在短信控制台申请
}

// 简单封装一下, 向指定手机下发验证码
// sendCode('18212341234', 1234) // 发送短信
function sendCode (phone, code, time = 10) {
  return new Promise((resolve, reject) => {
    phone = typeof (phone) === 'object' ? phone : [phone]
    const qcloudsms = QcloudSms(cfg.appid, cfg.appkey) // 实例化 QcloudSms
    const msender = qcloudsms.SmsMultiSender()
    msender.sendWithParam(86,
      phone, // 一个数组
      cfg.templateId, // 模版 id
      ['', code, time], // 正文中的参数值
      cfg.smsSign, // 签名 未提供或者为空时，会使用默认签名发送短信
      '', '',
      (err, res, resData) => { // 回调函数
        err && console.log('err: ', err)
        // console.log('request data: ', res.req)
        // console.log('response data: ', resData)
        if (resData.detail[0].errmsg !== 'OK') {
          console.error(resData)
        }
        resolve(resData)
      })
  })
}

export default sendCode
