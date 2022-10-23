'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
var newlineRe = /\r\n|\r|\n/
var normalizeEmptyLines = function (line) {
  if (line.length === 0) {
    line.push({
      types: ['plain'],
      content: '',
      empty: true
    })
  } else if (line.length === 1 && line[0].content === '') {
    line[0].empty = true
  }
}
var appendTypes = function (types, add) {
  var typesSize = types.length
  if (typesSize > 0 && types[typesSize - 1] === add) {
    return types
  }
  return types.concat(add)
}
var normalizeTokens = function (tokens) {
  var typeArrStack = [[]]
  var tokenArrStack = [tokens]
  var tokenArrIndexStack = [0]
  var tokenArrSizeStack = [tokens.length]
  var i = 0
  var stackIndex = 0
  var currentLine = []
  var acc = [currentLine]
  while (stackIndex > -1) {
    while ((i = tokenArrIndexStack[stackIndex]++) < tokenArrSizeStack[stackIndex]) {
      var content = void 0
      var types = typeArrStack[stackIndex]
      var tokenArr = tokenArrStack[stackIndex]
      var token = (tokenArr[i])
      if (typeof token === 'string') {
        types = stackIndex > 0 ? types : ['plain']
        content = token
      } else {
        types = appendTypes(types, token.type)
        if (token.alias) {
          types = appendTypes(types, token.alias)
        }
        content = token.content
      }
      if (typeof content !== 'string') {
        stackIndex++
        typeArrStack.push(types)
        tokenArrStack.push(content)
        tokenArrIndexStack.push(0)
        tokenArrSizeStack.push(content.length)
        continue
      }
      var splitByNewlines = content.split(newlineRe)
      var newlineCount = splitByNewlines.length
      currentLine.push({ types: types, content: splitByNewlines[0], type: types[0] })
      for (var t = 1; t < newlineCount; t++) {
        normalizeEmptyLines(currentLine)
        acc.push((currentLine = []))
        currentLine.push({ types: types, content: splitByNewlines[t], type: types[0] })
      }
    }
    stackIndex--
    typeArrStack.pop()
    tokenArrStack.pop()
    tokenArrIndexStack.pop()
    tokenArrSizeStack.pop()
  }
  normalizeEmptyLines(currentLine)
  return acc
}
export default normalizeTokens
