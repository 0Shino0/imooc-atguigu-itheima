// 基础类型
// boolean, number, string, symbol, null 和 undefined
// 对象类型 {} or object, [] or Array, function, Class类型

// string
const msg: string = 'hello ts'
// msg = '123123'
let msg1: string = '123'
// msg1 = 321
const msgStr = `${msg} ${msg1}`

console.log(msgStr)

// boolean
const bool: boolean = true

// object
const obj: Object = {}
const obj1: {} = {}

const obj2: { msg: string, num: number } = { msg: 'hello', num: 0 } 
const obj3: { msg: string, num?: number } = { msg: 'hello' }

obj3.num = 0
obj3.num = 123
console.log(obj3)

// array
const arr: [] = []
const arr3: string[] = ['12123']
const arr4: (string|number)[] = ['2323', 22222]

const arr1: Array<string> = ['123']
const arr2: Array<string | number> = ['123', 222]
