const Koa = require('koa')
const koaBody = require('koa-body')
const router = require('./router')
const cors = require('@koa/cors')

const app = new Koa()
app.use(cors())
app.use(koaBody())
app.use(router.routes())


app.on('error',(err,ctx)=>{
  console.log(err);
  ctx.body = 'Server Err'+err
})

app.listen(3000,()=>{
  console.log('http://127.0.0.1:3000');
})