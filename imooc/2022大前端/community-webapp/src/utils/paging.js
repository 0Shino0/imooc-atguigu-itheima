/**
 * 该对象用于统一所有页面的分页逻辑
 */

class Paging {
  #currentObj = [] // 当前页
  #limitObj = [] // 每页显示数量
  #isEnd = false // 数据是否已经全部加载
  #beginPage = 0 // 有些后台起始页是从 0 开始，有些是从 1 开始
  #resKey = '' // 后台返回数组对象的键

  constructor (api, pagingOptions, dataList, resKey) {
    this.api = api // 后台请求接口
    this.dataList = dataList // 前端数组的引用
    const _paingOpt = Object.entries(pagingOptions) // 后台分页的所需的：当前页、每页显示数量
    this.#currentObj = _paingOpt[0]
    this.#beginPage = this.#currentObj[1]
    this.#limitObj = _paingOpt[1]
    this.#resKey = resKey || 'data'
  }

  isEnd () {
    return this.#isEnd
  }

  // 翻页，调用后台接口
  next (qurryOptions, callback) {
    if (this.#isEnd) { // 如果数据已经全部加载，不再发起后台请求
      return
    }

    // 将页面中配置好的后台分页参数拼接到请求参数中去
    qurryOptions[this.#currentObj[0]] = this.#currentObj[1]
    qurryOptions[this.#limitObj[0]] = this.#limitObj[1]

    this.api(qurryOptions).then(res => {
      const list = res[this.#resKey] // 默认后台返回的 data 就是数据数组
      if (!Array.isArray(list)) {
        console.error('res.' + this.#resKey + '不是数组！')
        return
      }
      if (list.length < this.#limitObj[1] || list.length === 0) {
        // 如果后台取得的数组为空或者小于当前页的显示数量，说明数据已经全部加载
        this.#isEnd = true
      }
      this.dataList.push(...res[this.#resKey])
      this.#currentObj[1]++
      callback(res) // 将后台返回的数据交给回调函数
    })
  }

  // 数据清除
  clear () {
    console.log('清除')
    this.#currentObj[1] = this.#beginPage
    this.#isEnd = false
    this.dataList.length = 0 // 必须用这种方法清空数组，否则会失去页面数组的引用
  }
}

export default Paging
