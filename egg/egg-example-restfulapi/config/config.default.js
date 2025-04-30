/* eslint valid-jsdoc: "off" */

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1745982944128_3575';

  // add your middleware config here
  // 加载 errorHandler 中间件
  config.middleware = ['errorHandler'];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  // 只对以 /api 为前缀的 URL 路径生效
  config.errorHandler = {
    match: '/api',
  };

  return {
    ...config,
    ...userConfig,
  };
};
