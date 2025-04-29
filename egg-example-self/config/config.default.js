const path = require('path');

exports.keys = '<此处改为你自己的 Cookie 安全字符串>';

// 添加 view 配置项
exports.view = {
  defaultViewEngine: 'nunjucks',
  mapping: {
    '.tpl': 'nunjucks',
  },
};

// 添加 news 的配置项
exports.news = {
  pageSize: 5,
  serverUrl: 'https://hacker-news.firebaseio.com/v0',
};

// add middleware robot 防爬虫
exports.middleware = [
  'robot'
];
// robot's configurations
exports.robot = {
  ua: [/curl/i, /Baiduspider/i]
};

// 配置模板引擎, 使用不同的引擎
exports.view = {
  mapping: {
    '.js': 'assets',
    '.html': 'nunjucks',
  },
};

// 配置模板
module.exports = appInfo => ({
  assets: {
    templatePath: path.join(appInfo.baseDir, 'app/view/template.html'),
    templateViewEngine: 'nunjucks',
  },
  view: {
    // 如果还有其他模板引擎，需要合并多个目录
    root: path.join(appInfo.baseDir, 'app/assets'),
  },
});

exports.assets = {
    publicPath: '/public/',
    devServer: {
      debug: false,
      command: 'roadhog dev',
      port: 8000,
      env: {
        BROWSER: 'none',
        ESLINT: 'none',
        SOCKET_SERVER: 'http://127.0.0.1:8000',
        PUBLIC_PATH: 'http://127.0.0.1:8000',
      },
    },
  };