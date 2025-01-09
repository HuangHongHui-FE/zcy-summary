const domainTable = {
  test: 'test.zcygov.cn',
  test8: 'test8.cai-inc.com',
  staging: 'staging.zcygov.cn',
  debug: 'dev-debug.cai-inc.com',
  sh: 'dev-shanghai.cai-inc.com',
  testSH: 'test-shanghai.cai-inc.com',
};

const domain = domainTable.test;

module.exports = {
  useMockStatusCode: [404, 403, 500, 502], // number[]
  domain,
  uaa: {
    host: `http://login.${domain}`,
  },
  rules: [
    {
      host: `http://www.${domain}`,
      useMock: false,
      urls: ['/api/*', '/announcement/*', '/ad/test'],
    },
    {
      host: `http://message.${domain}`,
      useMock: false,
      urls: ['/basic-tools/*'],
    },
  ],
  user: {
    account: 'admin',
    password: 'test123456',
  },
};
