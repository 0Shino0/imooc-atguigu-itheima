// 基本的用法
function add(arg1: number, arg2:number): number {
  return arg1 + arg2
}

const result = add(1, 2)

const add1 = (arg1: number, arg2: number): number => {
  return arg1 + arg2
}

const result1 = add1(3, 4)

// 这种匿名函数 
// var fn = function() {}  -> const fn = () => {}

// const add2 = (arg1, arg2) => arg1 + arg2
// 类型 : (arg1: number, arg2: number) => number 
const add2: (arg1: number, arg2: number) => number = (arg1: number, arg2: number) => arg1 + arg2


// 函数重载
function handleData(x: string): string[];

function handleData(x: number): string;

// function handleData(x: boolean): null;

function handleData(x: any): any {
  if (typeof x === "string") {
    return x.split("")
  } else {
    return x.toString().split("").join("_")
  }
}

handleData("abc").join("_")
// handleData(123).join("_") // error 提示string上未有join方法
// handleData(false) // error  类型boolean不能赋值给类型number或者string

// const handleData1: (x: string) => string[]; // 这种方式是行不通的