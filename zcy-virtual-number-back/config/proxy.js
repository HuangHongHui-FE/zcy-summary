const domainTable = {
  test: 'test.zcygov.cn',
  test8: 'test8.cai-inc.com',
  staging: 'staging.zcygov.cn',
  debug: 'dev-debug.cai-inc.com',
  sh: 'dev-shanghai.cai-inc.com',
  testSH: 'test-shanghai.cai-inc.com',
};

const domain = domainTable.test;

// 此处不用使用es6导出方式
// eslint-disable-next-line no-undef
module.exports = {
  useMockStatusCode: [404, 403, 500, 502], // number[]
  domain,
  uaa: {
    host: `https://login.${domain}`,
  },
  rules: [
    {
      host: `https://www.${domain}`,
      useMock: false,
      urls: ['/api/*', '/announcement/*', '/ad/test'],
    },
    {
      host: `https://middle.${domain}`,
      useMock: false,
      urls: ['/user/*'],
    },
    {
      host: `http://message.${domain}`,
      useMock: false,
      urls: ['/basic-tools/*'],
    }
  ],
  user: {
    account: 'admin',
    password: 'Zfcg@123456',
  },
};
