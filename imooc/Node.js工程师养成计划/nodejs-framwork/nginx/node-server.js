var http = require('http')
var server = http.createServer()
server.listen(3000,()=>{
  console.log('服务器启动成功');
})
server.on('request',(req,res)=>{
  if(req.url == '/'){
    res.end('node-server')
  }else{
    res.end('other path node-server')
  }
})