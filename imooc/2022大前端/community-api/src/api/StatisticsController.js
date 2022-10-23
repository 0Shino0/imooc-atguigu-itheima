import { getJWTPayload } from '@/common/Utils'
import Post from '@/model/Post'
import PostHistory from '@/model/PostHistory'
import User from '@/model/User'
import UserCollect from '@/model/UserCollect'
import Comments from '@/model/Comments'
import CommentsHands from '@/model/CommentsHands'
import SignRecord from '@/model/SignRecord'

/**
 * 统计相关的 api 放在这里
 */
class StatisticsController {
  // 统计数据：最近浏览、我的帖子、收藏夹、我的评论、我的点赞、获赞、个人积分
  async wxUserCount (ctx) {
    const body = ctx.query
    const obj = await getJWTPayload(ctx.header.authorization)
    const { _id: uid } = obj
    const { reqAll } = body
    console.log('🚀 ~ file: StatisticsController.js ~ line 20 ~ StatisticsController ~ wxUserCount ~ reqAll', reqAll)
    if (uid) {
      const countMyHistory = (body.reqHistory || reqAll) && await PostHistory.queryCount({ uid }) // 最近浏览
      const countMyPost = (body.reqPost || reqAll) && await Post.queryCount({ uid }) // 我的帖子
      const countMyCollect = (body.reqCollect || reqAll) && await UserCollect.queryCollectCount({ uid }) // 收藏夹
      const countMyComment = (body.reqComment || reqAll) && await Comments.countDocuments({ cuid: uid }) // 我的评论
      const countMyHands = (body.reqHands || reqAll) && await CommentsHands.countDocuments({ uid }) // 我的点赞
      const countHandsOnMe = (body.reqHandsOnMe || reqAll) && await CommentsHands.countDocuments({ huid: uid }) // 获赞
      const countFavs = (body.reqFavs || reqAll) && await User.getFavs(uid) // 个人积分
      const lastSigned = (body.reqLastSigned || reqAll) && await SignRecord.findByUid(uid) // 获取用户最新的签到日期

      ctx.body = {
        code: 200,
        data: {
          countMyPost,
          countMyCollect,
          countMyComment,
          countMyHands,
          countHandsOnMe,
          countMyHistory,
          countFavs,
          lastSigned
        }
      }
    } else {
      ctx.body = {
        code: 500,
        msg: '查询失败'
      }
    }
  }
}

export default new StatisticsController()
