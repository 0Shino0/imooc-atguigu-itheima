// any -> es5 var -> 任意类型
let a: any

a = 123
a = '123'
a = () => { }

// void -> 没有类型
// never -> 永远不存在的什或者类型
// unknown -> 未知的类型
let b: void
// b = 123
// b = 'unknow'
b = undefined
// b = void
// b = null

let c: unknown
c = 123
c = '12312'
c = undefined
c = null

a.toFixed(2)
a.join('_')
// c.toFixed(2)
// c.join('_')

if (typeof c === 'number') {
  c.toFixed(2)
} else if (typeof c === 'object' && c instanceof Array) {
  c.join('_')
}

