var fs = require('fs')
fs.readFile('./a.txt','utf8',function(err,data){
  if(!err){
    var newData = data + '8888'
    fs.writeFile('./a.txt',newData,function(err){
      if(!err){
        console.log('追加成功');
      }
    })
  }
})