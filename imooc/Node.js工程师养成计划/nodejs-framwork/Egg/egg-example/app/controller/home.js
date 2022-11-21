'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    // const { ctx } = this;
    // ctx.body = 'hi, egg';
    // this.ctx.body = this.app.foo
    var serviceData =  this.service.user.getUserList()
    this.ctx.body = serviceData

  }
}

module.exports = HomeController;
