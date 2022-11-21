var fs = require('fs')
module.exports = {
  index(res){
    fs.readFile('./index.html', 'utf-8', function (err, data) {
      res.write(data)
      res.end()
    })
  },

  user(postData,res){
    // 业务逻辑代码
    console.log(postData);
  }
}