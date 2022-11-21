const Koa = require('koa')
const router = require('./router')
const koaBody = require('koa-body')
const app = new Koa()
app.use(koaBody());

app.use(router.routes())

app.on('error',(err,ctx)=>{
  console.log(err);
  ctx.body = err
})

app.listen(3000,()=>{
  console.log('http://127.0.0.1:300');
})