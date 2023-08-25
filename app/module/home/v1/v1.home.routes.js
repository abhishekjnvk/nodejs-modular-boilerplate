
module.exports.routes = (router, serviceLocator) => {
  const homeControllerV1 = serviceLocator.get('homeControllerV1');

  router.get('/', (req, res, next) => {
    serviceLocator.get('logger').info('home Router v1');
    homeControllerV1.home(req, res, next);
  })
}

// module.exports = router;
