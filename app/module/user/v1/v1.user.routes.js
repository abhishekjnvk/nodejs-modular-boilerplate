module.exports.routes = (router, serviceLocator) => {
  router.get('/new', (req, res, next) => {
    serviceLocator.get('logger').info('user Router v1');
    serviceLocator.get('homeControllerV1').home(req, res, next);
  })
}
