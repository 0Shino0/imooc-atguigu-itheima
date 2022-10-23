import { HttpResponse, PostInfo } from '@/common/interface'
import { textMap } from '@/config/const'
import { computed, reactive } from 'vue'
import { getComents, setCommentBest, setHands } from '@/api/comments'
import { getDetail } from '@/api/content'
import { scrollToElem } from '@/utils/common'
import { confirm } from '@/components/modules/alert/index'
import { popup } from '@/components/modules/pop/index'

export const ContentsService = () => {
  const state = reactive({
    total: 0,
    size: 10,
    current: 0,
    page: {
      title: '',
      catalog: ''
    } as PostInfo,
    comments: [],
    editInfo: {
      content: '',
      code: '',
      cid: '',
      item: {},
      sid: ''
    }
  })

  const tag = computed(() => (state.page && state.page.catalog) ? textMap[state.page.catalog] : '')

  const getPostDetail = async (tid: string) => {
    const res = await getDetail(tid)
    const { code, data } = res as HttpResponse
    if (code === 200) {
      state.page = data
    }
  }

  const getCommentsList = async (tid: string) => {
    const res = await getComents({
      tid: tid,
      page: state.current,
      limit: state.size
    })

    const { code, data, total } = res as HttpResponse
    if (code === 200) {
      state.comments = data
      state.total = total || 0
    }
  }

  const editComment = async (item) => {
    state.editInfo.content = item.content
    // 动态滚动到输入框的位置，并且进行focus
    scrollToElem('.layui-input-block', 500, -65)
    const elem = document.getElementById('edit')
    if (elem) {
      elem.focus()
    }
    // 确定需要去编辑的记录
    state.editInfo.cid = item._id || ''
    state.editInfo.item = item
  }

  const setBest = (item, tid: string) => {
    confirm(
      '确定采纳为最佳答案吗?',
      async () => {
        // 发送采纳最佳答案请求
        const res = await setCommentBest({
          cid: item._id,
          tid: tid
        })
        const { code } = res as HttpResponse
        if (code === 200) {
          popup('', '设置最佳答案成功！')
          item.isBest = '1'
          state.page.isEnd = '1'
        }
      },
      () => {
        console.log('cancel')
      }
    )
  }

  const hands = async (item) => {
    const res = await setHands({ cid: item._id })
    const { code, msg } = res as HttpResponse
    if (code === 200) {
      popup('', '点赞成功')
      item.handed = '1'
      item.hands += 1
    } else {
      popup('shake', msg?.toString())
    }
  }

  const reply = (item) => {
    // 插入@ + name 到 content
    // 滚动页面到输入框
    // focus 输入框
    const reg = /^@[\S]+/g
    if (state.editInfo.content) {
      if (reg.test(state.editInfo.content)) {
        state.editInfo.content = state.editInfo.content.replace(
          reg,
          '@' + item.cuid.name + ' '
        )
      } else {
        if (state.editInfo.content !== '') {
          // 非空的情况
          state.editInfo.content = `@${item.cuid.name} ${state.editInfo.content}`
        }
      }
    } else {
      // 评论框为空
      state.editInfo.content = '@' + item.cuid.name + ' '
    }
    // 动态滚动到输入框的位置，并且进行focus
    scrollToElem('.layui-input-block', 500, -65)
    const elem = document.getElementById('edit')
    if (elem) {
      elem.focus()
    }
  }

  return {
    tag,
    state,
    getPostDetail,
    getCommentsList,
    editComment,
    setBest,
    hands,
    reply
  }
}
