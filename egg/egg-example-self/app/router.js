module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/news', controller.news.list);
  router.get('/some', controller.some.list);
  router.get('/isIOS', controller.home.isIOS);
};
