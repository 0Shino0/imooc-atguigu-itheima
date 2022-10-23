// 接口 -> ts最重要的概念 -> 定义任意的结构或者类型
var myPoint = { x: 0, y: 0, z: 0 };
var myPoint1 = {
    x: 0,
    y: 0,
    z: 0,
    a: '',
    b: '',
    d: 0
};
var addFunc = function (arg1, arg2) { return arg1 + arg2; };
var role = ['super_admin', 'admin'];
// console.log(role.length)
// 当定义了索引类型之后，数组的length方法，将不存在，包括Array原型链上的其他方法也不存在了
var role1 = {
    0: "super_admin",
    1: "admin",
    5: "user"
};
var getTypes = function (_a) {
    var color = _a.color;
    return "" + color;
};
// 1.类型断言
getTypes({
    color: 'red',
    type: 'color',
    num: 0
});
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
var option = { color: 'yellow', size: 12 };
getTypes(option);
