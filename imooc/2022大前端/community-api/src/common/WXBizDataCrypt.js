const crypto = require('crypto')
function WXBizDataCrypt (appId, sessionKey) {
  this.appId = appId
  this.sessionKey = sessionKey
}

WXBizDataCrypt.prototype.decryptData = function (encryptedData, iv) {
  // base64 decode
  let sessionKey = Buffer.from(this.sessionKey, 'base64')
  encryptedData = Buffer.from(encryptedData, 'base64')
  iv = Buffer.from(iv, 'base64')
  let decoded
  try {
    // 解密
    let decipher = crypto.createDecipheriv('aes-128-cbc', sessionKey, iv)
    // 设置自动 padding 为 true，删除填充补位
    decipher.setAutoPadding(true)
    // https://developers.weixin.qq.com/community/develop/doc/000466ea294fe0c50266ac5b15b800
    decoded = decipher.update(encryptedData, '', 'utf8')
    // decoded = decipher.update(encryptedData, 'binary', 'utf8')
    decoded += decipher.final('utf8')

    decoded = JSON.parse(decoded)
  } catch (err) {
    throw new Error('Illegal Buffer')
  }

  if (decoded.watermark.appid !== this.appId) {
    throw new Error('Illegal Buffer')
  }

  return decoded
}

module.exports = WXBizDataCrypt
