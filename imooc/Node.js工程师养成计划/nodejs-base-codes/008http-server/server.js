var http = require('http')

var router = require('./router')
var server = http.createServer()
server.listen(8080, function () {
  console.log('http://127.0.0.1:8080');
})

server.on('request', function (req, res) {
  router(req,res)
})
