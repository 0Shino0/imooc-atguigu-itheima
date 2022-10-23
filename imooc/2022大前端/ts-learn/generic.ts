// const pushArr = (arr: string[], item: string): string[] => {
//   arr.push(item)
//   return arr
// }

// const pushNumArr = (arr: number[], item: number): number[] => {
//   arr.push(item)
//   return arr
// }

const pushArr = <T>(arr: T[], item: T): T[] => {
  arr.push(item)
  return arr
}

const arrnum: number[] = [1, 2, 3, 4]

pushArr<number>(arrnum, 3)
pushArr<string>(['123'], '3')


function swapGeneric<T, U>(tuple: [T, U]): [U, T] {
  return [tuple[1], tuple[0]]
}

const res = swapGeneric<string, number>(['123', 123])
res[0].toFixed()
res[1].indexOf('123')
console.log('🚀 ~ file: generic.ts ~ line 26 ~ result', res)