import faces from '@/static/js/face'

const formatHTML = (val = '') => {
  if (!val) return ''
  // 替换表情
  let result = val
  const face = /\sface\[\S{1,}]/g
  if (face.test(result)) {
    const group = result.match(face)
    group.forEach((item) => {
      const key = item.match(/\[\S+\]/g)[0]
      result = result.replace(item, `<img src="${faces[key]}">`)
    })
  }

  // 图片替换
  const img = /img\[\S+\]/g
  if (img.test(result)) {
    const group = result.match(img)
    group.forEach((item) => {
      result = result.replace(item, `<img src="${item.substr(4, item.length - 5)}">`)
    })
  }

  // 链接替换 a(链接)[标题]
  const link = /\sa\(\S+\]/g
  if (link.test(result)) {
    const group = result.match(link)
    const title = /\((.+)\)/
    const linkName = /\[(.+)\]/
    group.forEach((item) => {
      const nameGroup = item.match(linkName)
      let name = ''
      if (nameGroup.length > 0) {
        name = nameGroup[1]
      }
      const linkGroup = item.match(title)
      let link = ''
      if (linkGroup.length > 0) {
        link = linkGroup[1]
      }
      result = result.replace(item, `<a href="${link}">${name}</a>`)
    })
  }
  // 引用替换
  result = result.replace(/\[quote\]/g, '<blockquote class="layui-elem-quote">')
  result = result.replace(/\[\/quote\]/g, '</blockquote>')

  // 代码块替换
  const code = /(\[\/?pre(.+?)[^\]]*\])|\[[^\]]*\]/g
  if (code.test(result)) {
    result = result.replace(/\[pre\]/g, '<pre><code>')
    result = result.replace(/\[\/pre\]/g, '</code></pre>')
  }

  // hr替换
  result = result.replace(/\[hr\]/g, '<hr>')

  // 回车换行的替换
  // result = result.replace(/\r\n/g, '<br>')
  // result = result.replace(/\n/g, '<br>')
  return result
}
export default formatHTML
