const accessKeyId = process.env.OBS_KEYID || 'IN9XLCEG8OYQVEAJ9U69'
const secretAccessKey = process.env.OBS_ACCESSKEY || 'TlSm0dWTrLWAe5MwTiSYqQP7AqUp6FXheXOSS9bX'
const server = 'obs.cn-east-3.myhuaweicloud.com' // Endpoint
const bucket = 'toimc-public' // 桶名称

export default {
  accessKeyId,
  secretAccessKey,
  server,
  bucket
}
