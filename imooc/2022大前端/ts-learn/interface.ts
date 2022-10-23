// 接口 -> ts最重要的概念 -> 定义任意的结构或者类型

interface publicPoint {
  x: number | string;
  y: number;
  z: number;
}

interface Point extends publicPoint {
  a?: number 
  // x: number | string;
  // y: number;
}

interface Point1 extends publicPoint, Point2 {
  // x: number,
  // y: number,
  a: string;
  b: string;
}

interface Point2 {
  d: number;
}

const myPoint: Point = { x: 0, y: 0, z: 0 }

const myPoint1: Point1 = {
  x: 0,
  y: 0,
  z: 0,
  a: '',
  b: '',
  d: 0
}

// 函数定义
interface Func {
  (num1: number, num2: number): number;
}

const addFunc: Func = (arg1, arg2) => arg1 + arg2

// 索引类型
interface Role {
  [id: number]: string;
}

const role: Role = ['super_admin', 'admin']
// console.log(role.length)
// 当定义了索引类型之后，数组的length方法，将不存在，包括Array原型链上的其他方法也不存在了

const role1: Role = {
  0: "super_admin",
  1: "admin",
  5: "user"
}

// 绕开多余属性检查
// interface MyType {
//   color: string;
//   [prop: string]: any;
// }
interface MyType {
  color: string;
}


const getTypes = ({ color }: MyType) => {
  return `${color}`
}

// 1.类型断言
getTypes({
  color: 'red',
  type: 'color',
  num: 0
} as MyType)

// 2.索引签名
// getTypes({
//   color: 'red',
//   type: 'color',
//   num: 0,
//   num1: [],
//   a: () => { },
//   b: {},
//   c: '123123'
// })

// 3.类型兼容 - 不推荐的
const option = { color: 'yellow', size: 12}
getTypes(option)