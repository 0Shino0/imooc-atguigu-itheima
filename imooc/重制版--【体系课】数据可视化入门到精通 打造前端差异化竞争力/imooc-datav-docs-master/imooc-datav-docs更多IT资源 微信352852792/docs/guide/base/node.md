# 后端框架搭建

## Node 简介

:::tip
[查看](https://github.com/nodejs/node) node 源码
:::

Node 是一个基于 V8 引擎的 Javascript 运行环境，它使得 Javascript 可以运行在服务端，直接与操作系统进行交互，与文件控制、网络交互、进程控制等
> Chrome 浏览器同样是集成了 V8 引擎的 Javascript 运行环境，与 Node 不同的是他们向 Javascript 注入的内容不同，Chrome 向 Javascript 注入了 window 对象，Node 注入的是 global，这使得两者应用场景完全不同，Chrome 的 Javascript 所有指令都需要通过 Chrome 浏览器作为中介实现

## Express 简介

:::tip
[查看](https://github.com/expressjs/express) express 源码
:::

express 是一个轻量级的 Node Web 服务端框架，同样是一个人气超高的项目，它可以帮助我们快速搭建基于 Node 的 Web 应用

## 项目初始化

创建项目

```bash
mkdir admin-imooc-node
cd admin-imooc-node
npm init -y
```

安装依赖

```bash
npm i -S express
```

创建 app.js

```js
const express = require('express')

// 创建 express 应用
const app = express()

// 监听 / 路径的 get 请求
app.get('/', function(req, res) {
  res.send('hello node')
})

// 使 express 监听 5000 端口号发起的 http 请求
const server = app.listen(5000, function() {
  const { address, port } = server.address()
  console.log('Http Server is running on http://%s:%s', address, port)
})
```

## Express 三大基础概念

### 中间件

中间件是一个函数，在请求和响应周期中被顺序调用

> Middleware functions are functions that have access to the request object (req), the response object (res), and the next function in the application’s request-response cycle.

```js
const myLogger = function(req, res, next) {
  console.log('myLogger')
  next()
}

app.use(myLogger)
```

:::warning
提示：中间件需要在响应结束前被调用
:::

### 路由

应用如何响应请求的一种规则

> Routing refers to how an application’s endpoints (URIs) respond to client requests.
  
响应 / 路径的 get 请求：
```js
app.get('/', function(req, res) {
  res.send('hello node')
})
```

响应 / 路径的 post 请求：
```js
app.post('/', function(req, res) {
  res.send('hello node')
})
```

规则主要分两部分：

- 请求方法：get、post......
- 请求的路径：/、/user、/.*fly$/......

### 异常处理

通过自定义异常处理中间件处理请求中产生的异常

```js
app.get('/', function(req, res) {
  throw new Error('something has error...')
})

const errorHandler = function (err, req, res, next) {
  console.log('errorHandler...')
  res.status(500)
  res.send('down...')
}

app.use(errorHandler)
```

:::tip
使用时需要注意两点：
- 第一，参数一个不能少，否则会视为普通的中间件
- 第二，中间件需要在请求之后引用
:::

## 项目框架搭建

### 路由

安装 boom 依赖：

```bash
npm i -S boom
```

创建 router 文件夹，创建 router/index.js：

```js
const express = require('express')
const boom = require('boom')
const userRouter = require('./user')
const {
  CODE_ERROR
} = require('../utils/constant')

// 注册路由
const router = express.Router()

router.get('/', function(req, res) {
  res.send('欢迎学习小慕读书管理后台')
})

// 通过 userRouter 来处理 /user 路由，对路由处理进行解耦
router.use('/user', userRouter)

/**
 * 集中处理404请求的中间件
 * 注意：该中间件必须放在正常处理流程之后
 * 否则，会拦截正常请求
 */
router.use((req, res, next) => {
  next(boom.notFound('接口不存在'))
})

/**
 * 自定义路由异常处理中间件
 * 注意两点：
 * 第一，方法的参数不能减少
 * 第二，方法的必须放在路由最后
 */
router.use((err, req, res, next) => {
  const msg = (err && err.message) || '系统错误'
  const statusCode = (err.output && err.output.statusCode) || 500;
  const errorMsg = (err.output && err.output.payload && err.output.payload.error) || err.message
  res.status(statusCode).json({
    code: CODE_ERROR,
    msg,
    error: statusCode,
    errorMsg
  })
})

module.exports = router
```

创建 router/use.js：
```js
const express = require('express')

const router = express.Router()

router.get('/info', function(req, res, next) {
  res.json('user info...')
})

module.exports = router
```

创建 utils/constant：
```js
module.exports = {
  CODE_ERROR: -1
}
```

验证 /user/info：

```bash
"user info..."
```

验证 /user/login：

```json
{"code":-1,"msg":"接口不存在","error":404,"errorMsg":"Not Found"}
```
