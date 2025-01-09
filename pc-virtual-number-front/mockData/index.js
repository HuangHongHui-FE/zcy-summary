const Mock = require('mockjs');

module.exports = {
  '/ad/test': () =>
    Mock.mock({
      name: Mock.Random.cname(),
    }),
};
