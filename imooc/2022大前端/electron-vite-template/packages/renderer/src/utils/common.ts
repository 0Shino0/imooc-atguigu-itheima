export const getParams = (key: string, url: string) => {
  // 构造一个含有目标参数的正则表达式对象
  const reg = new RegExp('(^|&)' + key + '=([^&]*)(&|$)')
  // 匹配目标参数
  const link = new URL(url)
  const r = link.search.substr(1).match(reg)
  // 返回参数值
  if (r != null) {
    return decodeURI(r[2])
  }
  return null
}

export const getParam = (name: string, url: string) => {
  if (!url) url = location.href
  name = name.replace(/[\\[]/, '\\\\[').replace(/[\]]/, '\\\\]')
  const regexS = '[\\?&]' + name + '=([^&#]*)'
  const regex = new RegExp(regexS)
  const results = regex.exec(url)
  return results == null ? null : results[1]
}

export const getElememtY = (elem: string) => {
  const dom = document.querySelector(elem)
  if (dom !== null) {
    return window.pageYOffset + dom.getBoundingClientRect().top
  }
}

/**
 * 滚动到指定的元素
 * @param {String} elem DOM元素
 * @param {Number} duration 滚动动画执行的时间
 * @param {Number} offset 滚动偏移量
 */
export const scrollToElem = (elem: string, duration: number, offset: number) => {
  // 初始位置
  const startingY = window.pageYOffset
  const elementY = getElememtY(elem)
  if (!elementY) return
  // 需要去滚动的距离
  const diff = elementY - startingY + offset
  // 如果 diff 0
  if (!diff) return
  const easing = (t: number) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
  let start: number
  window.requestAnimationFrame(function step (timestamp) {
    if (!start) start = timestamp
    // 计算时间的差值，根据差值计算偏移量
    const time = timestamp - start
    let percent = Math.min(time / duration, 1)
    percent = easing(percent)
    window.scrollTo(0, startingY + diff * percent)

    if (time < duration) {
      window.requestAnimationFrame(step)
    }
  })
}

export const getDecodeParam = (key: string) => {
  const queryStr = window.location.href.replace(/.*\?/, '')
  const obj = Object.fromEntries(queryStr.split('&').map(v => v.split('=')))
  return obj[key] ? decodeURIComponent(obj[key]) : null
}
