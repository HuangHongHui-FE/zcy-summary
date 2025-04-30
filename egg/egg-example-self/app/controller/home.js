const Controller = require('egg').Controller;
const path = require('path');

class HomeController extends Controller {
  async index() {
    this.ctx.body = 'Hello world';
  }

  async isIOS() {
    this.ctx.body = `isIOS: ${this.ctx.isIOS}`;
  }

  // async render() {
  //   await this.ctx.render('index.js');
  // }

  async render() {
    await this.ctx.render(
      'index.js',
      {},
      {
        templatePath: path.join(
          this.app.config.baseDir,
          'app/view/template.html'
        ),
        templateViewEngine: 'nunjucks',
      }
    );
  }
}

module.exports = HomeController;