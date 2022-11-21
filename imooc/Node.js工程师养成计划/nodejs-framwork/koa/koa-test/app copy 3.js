const Koa = require('koa')
const Router = require('@koa/router')
const app = new Koa()
const router = new Router()

router.get('/user/info',ctx=>{
  ctx.body = 'hello user'
})
// router.post()


app.use(router.routes())

app.listen(3000,()=>{
  console.log('http://127.0.0.1:300');
})