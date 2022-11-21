const Router = require('@koa/router')
const router = new Router({prefix:'/api/v1'})

router.get('/user',ctx=>{
  // ctx.throw(400,'Errmsg')
  JSON.parse('')
  ctx.body = 'userssss'
})
router.post('/user',ctx=>{
  console.log(ctx.request.body.names);
})
router.get('/video/:id/:age',ctx=>{
  // console.log(ctx.query)
  console.log(ctx.params.id,ctx.params.age);
  ctx.body = 'video '
})

module.exports = router