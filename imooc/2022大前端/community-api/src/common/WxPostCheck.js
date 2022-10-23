import { wxGetAccessToken, wxMsgCheck, wxImgCheck } from './WxUtils'

// 该方法用于审核用户在小程序提交的内容
export default async (ctx, next) => {
  const url = ctx.url
  if (
    url.includes('/content/wxAdd') ||
    url.includes('/comments/wxreply')
  ) { // 内容审核
    const { body } = ctx.request
    // 调用微信审核接口
    const content = Object.values(body).join('')
    const accessToken = await wxGetAccessToken()
    const errcode = await wxMsgCheck(accessToken, content)
    if (errcode === 0) {
      return next()
    } else {
      ctx.body = {
        code: 500,
        msg: '提交的内容违规！'
      }
    }
  } else if (url.includes('/content/uploadImg')) { // 图片审核
    const file = ctx.request.files.file
    const accessToken = await wxGetAccessToken()
    const errcode = await wxImgCheck(accessToken, file)
    if (errcode === 0) {
      return next()
    } else {
      ctx.body = {
        code: 500,
        msg: '上传的图片违规！'
      }
    }
  } else {
    return next()
  }
}
