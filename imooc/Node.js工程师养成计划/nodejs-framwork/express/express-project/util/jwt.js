const jwt = require('jsonwebtoken')
const { promisify } = require('util')
const { uuid } = require('../config/config.default')
const tojwt = promisify(jwt.sign)
const verfiy = promisify(jwt.verify)

module.exports.verifyToken = function (requried=true) {
  return async (req, res, next) => {
    var token = req.headers.authorization
    token = token ? token.split("Bearer ")[1] : null
    if (token) {
      try {
        let userinfo = await verfiy(token, uuid)
        req.user = userinfo
        next()
      } catch (error) {
        res.status('402').json({ error: '无效的token' })
      }
    }else if(requried){
      res.status(402).json({ error: "请传入token" })
    }else{
      next()
    }
    
  }
}


module.exports.createToken = async userinfo => {
  var token = await tojwt(
    { userinfo },
    uuid,
    {
      expiresIn: 60 * 60 * 24
    }
  )
  return token
}






// var token = jwt.sign({foo:'hello'},'555')
// console.log(token);

// var jwts =  jwt.verify(
//   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJoZWxsbyIsImlhdCI6MTY1MDk0MzAwNn0.e2yqqJMlOq5uR9udeCl5KAjjHsK-LsJYAFv4ro8gaTc'
//   , '555'
// )
// console.log(jwts);