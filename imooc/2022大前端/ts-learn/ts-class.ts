class Person {
  // public - 公共的，允许在类的外面进行调用
  // protected - 允许在类（l）内(n)及继承的子类中使用
  // private - 只允许在类内使用
  private name = 'toimc' // 默认public
  protected name1 = 'toimc1' // 被保护的
  getName() {
    return this.name + this.name1
  }
}

const person = new Person()
// console.log(person.name)
// console.log(person.getName())

// 苹果 -> 一类水果， 这个苹果 -> 实例, 香蕉苹果 -> 苹果
class Person1 extends Person {
  constructor() {
    super()
    // console.log(super.getName())
    // console.log(this.getName())
  }
  getName() {
    return 'new toimc'
  }
}
const person1 = new Person1()
// console.log(person1.getName())

// 类类型接口
interface FoodInterface {
  type: string;
}

class FoodClass implements FoodInterface {
  constructor(public type:string) {
  }
}

// class FoodClass implements FoodInterface {
//   type: string
//   constructor(arg:string) {
//     this.type = arg
//   }
// }

// 接口继承类
// 1.接口可以继承类，当接口继承了类之后，会继承成员（类型），但是不包括实现；
// 2.接口还会继承private和protected修饰的成员，但是这个接口只可被这个类或它的子类实现
interface I extends Person { }

// 类与类，接口与接口之间使用extends
// 类与接口，implements
class C extends Person implements I {
  // private name: string;
  // constructor(arg: string, public name1: string) {
  //   // this.name = arg
  // }
  getName() {
    return this.name1 + 'new Class C'
  }
}

const instance = new C()
console.log(instance.getName())