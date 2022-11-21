const Controller = require('egg').Controller
class VideoController extends Controller {
  async gethots(){
    var tops = await this.service.redishot.tophots(10)
    this.ctx.body = tops    
  }

  async createComment() {
    const body = this.ctx.request.body
    const videoid = this.ctx.params.videoid

    this.ctx.validate({
      content: { type: 'string' }
    }, body)
    const { Video, Videocomment } = this.app.model
    const video = await Video.findById(videoid)
    if (!video) {
      this.ctx.throw(404, '视频不存在')
    }

    const comment = await new Videocomment({
      content: body.content,
      user: this.ctx.user._id,
      video: videoid
    }).save()

    if(comment){
      video.commentCount = await Videocomment.countDocuments({
        video:videoid
      })
      await video.save()
      // 增加热度
      this.service.redishot.hotInc(videoid,2)
      this.ctx.body={
        msg:"评论成功"
      }
    }else{
      this.ctx.throw(501,'视频评论失败')
    }

  }
}

module.exports = VideoController