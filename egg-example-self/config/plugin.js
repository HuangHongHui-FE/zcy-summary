const path = require('path');

exports.nunjucks = {
  // 开启插件
  enable: true,
  package: 'egg-view-nunjucks',
};

// 插件
exports.ua = {
  enable: true,
  path: path.join(__dirname, '../lib/plugin/egg-ua'),
};