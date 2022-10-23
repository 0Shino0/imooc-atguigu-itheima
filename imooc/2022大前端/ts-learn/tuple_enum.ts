// tuple -> 元组 -> 固定类型 + 长度的数组
const teacherInfo: [string, string, number] = ['toimc', 'male', 18]

// enum -> 枚举 -> 罗列出来的所有的可能的情况 -> 常量
// 性别：男-1 male 女-0 female
enum Direction {
  Up,
  Down,
  Left,
  Right
}

enum Gender {
  Male,
  Female
}

// console.log(Gender.Male)
// console.log(Gender[0])
// console.log(Gender[1])
// console.log(Gender[3])

enum Direction1 {
  Up,
  Down = 100,
  Left,
  Right
}

console.log(Direction1.Up)
console.log(Direction1.Down)
console.log(Direction1.Left)
console.log(Direction1.Right)

console.log(Direction1[100])