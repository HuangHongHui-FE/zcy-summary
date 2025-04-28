const Controller = require('egg').Controller;

class SomeController extends Controller {
  async list() {
    const ctx = this.ctx;
    const rule = await ctx.service.some.list();
    console.log("🚀 ~ SomeController ~ list ~ rule:", rule)
    this.ctx.body = rule.join('---');
  }
}

module.exports = SomeController;