var fs = require('fs')
// console.log(fs);
fs.readFile('./a.txt','utf8',function(err,data){
  console.log(err);
  console.log(data);
})