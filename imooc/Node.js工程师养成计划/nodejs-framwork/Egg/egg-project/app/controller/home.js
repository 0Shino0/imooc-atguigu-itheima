'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    // const { ctx } = this;
    // ctx.body = 'hi, egg';

    var userinfo =  await this.app.model.User.find()
    this.ctx.body = userinfo

  }
}

module.exports = HomeController;
