const Koa = require('koa')
const app = new Koa()
app.use(ctx=>{
  // ctx.body = 'Hello koa'
  // console.log(ctx.req.method)
  // console.log(ctx.req.url)
  console.log(ctx.header)
})
app.listen(3000,()=>{
  console.log('http://127.0.0.1:300');
})