import { getList } from '@/api/content'

export default {
  data () {
    return {
      status: '',
      tag: '',
      sort: 'created',
      page: 0,
      limit: 20,
      isTop: 0,
      catalog: '',
      isEnd: false,
      isRepeat: false,
      current: '',
      lists: [
      ]
    }
  },
  mounted () {
    let catalog = this.$route.params['catalog']
    if (typeof catalog !== 'undefined' && catalog !== '') {
      this.catalog = catalog
    }
    this._getLists()
  },
  methods: {
    init () {
      this.page = 0
      this.lists = []
      this.isEnd = false
      this._getLists()
    },
    _getLists () {
      if (this.isRepeat) return
      if (this.isEnd) return
      this.isRepeat = true
      let options = {
        catalog: this.catalog,
        isTop: this.isTop,
        page: this.page,
        limit: this.limit,
        sort: this.sort,
        tag: this.tag,
        status: this.status
      }
      getList(options).then((res) => {
        // 加入一个请求锁，防止用户多次点击，等待数据返回后，再打开
        this.isRepeat = false
        // 对于异常的判断，res.code 非200，我们给用户一个提示
        // 判断是否lists长度为0，如果为零即可以直接赋值
        // 当Lists长度不为0，后面请求的数据，加入到Lists里面来
        if (res.code === 200) {
          // 判断res.data的长度，如果小于20条，则是最后页
          if (res.data.length < this.limit) {
            this.isEnd = true
          }
          if (this.lists.length === 0) {
            this.lists = res.data
          } else {
            this.lists = this.lists.concat(res.data)
          }
          this.page++
        }
      }).catch((err) => {
        this.isRepeat = false
        if (err) {
          this.$alert(err.message)
        }
      })
    },
    nextPage () {
      this._getLists()
    }
  }
}
