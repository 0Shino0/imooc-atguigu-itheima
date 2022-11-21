const Service = require('egg').Service
class UserService extends Service {
  getUserList (){
    return [
      {id:0,username:'Monica'}
    ]
  }
}

module.exports = UserService
