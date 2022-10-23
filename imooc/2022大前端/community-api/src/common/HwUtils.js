import cfg from '@/config/HwConfig'

/**
 * 华为云文档：https://support.huaweicloud.com/sdk-nodejs-devg-obs/obs_29_0404.html
 */
const hwUpload = (fileName, filePath) => {
  // 引入obs库
  // 使用npm安装
  let ObsClient = require('esdk-obs-nodejs')
  // 使用源码安装
  // var ObsClient = require('./lib/obs');

  // 创建ObsClient实例
  let obsClient = new ObsClient({
    access_key_id: cfg.accessKeyId,
    secret_access_key: cfg.secretAccessKey,
    server: cfg.server
  })

  let fs = require('fs')

  return new Promise((resolve, reject) => {
    obsClient.putObject({
      Bucket: cfg.bucket,
      Key: fileName,
      // 创建文件流，其中localfile为待上传的本地文件路径，需要指定到具体的文件名
      Body: fs.createReadStream(filePath)
    }, (err, result) => {
      if (err) {
        console.error('Error-->' + err)
        reject(err)
      } else {
        const status = result.CommonMsg.Status
        console.log('Status-->' + status)
        if (status === 200) {
          resolve('https://' + cfg.bucket + '.' + cfg.server + '/' + fileName)
        } else {
          reject(new Error('上传图片错误！华为OBS返回码：' + status))
        }
      }
    })
  })
}

export {
  hwUpload
}
