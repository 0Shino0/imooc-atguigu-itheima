const Controller = require('egg').Controller
const RPCClient = require('@alicloud/pop-core').RPCClient

class VodController extends Controller {
  async getvodinfo(vodId) {
    var client = await this.vodClient()
    var res = await client.request('GetPlayInfo', {
      VideoId: vodId
    }, {})
    return res
  }

  async getvideo() {
    var videoid = this.ctx.params.videoid
    var dbback = await this.app.model.Video.findById(videoid)
    if(dbback){
      var videoInfo = dbback._doc
      var vodid = videoInfo.vodvideoId
      var vodInfo = await this.getvodinfo(vodid)
      videoInfo.vod = vodInfo
      this.ctx.body = videoInfo
    }else{
      this.throw(404,'视频不存在')
    }
  }

  async vodClient() {
    var regionId = 'cn-shanghai';   // 点播服务接入地域
    var client = new RPCClient({//填入AccessKey信息
      accessKeyId: 'LTAI5t6N7W3BoSYpmtasXzoo',
      accessKeySecret: 'GSedSGNfNDvUOGP1Txz5AnwAxfSsa3',
      endpoint: 'http://vod.' + regionId + '.aliyuncs.com',
      apiVersion: '2017-03-21'
    });

    return client;
  }

  async getvod() {
    const query = this.ctx.query
    this.ctx.validate({
      title: { type: 'string' },
      filename: { type: 'string' }
    }, query)
    var client = await this.vodClient()
    const vodback = await client.request('CreateUploadVideo', {
      Title: query.title,
      FileName: query.filename
    }, {})
    this.ctx.body = vodback
  }

}

module.exports = VodController