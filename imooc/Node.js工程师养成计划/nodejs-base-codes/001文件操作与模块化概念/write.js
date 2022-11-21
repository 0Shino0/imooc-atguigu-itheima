var fs = require('fs')
fs.writeFile('./a.txt','6666',function(err){
  console.log(err);
})