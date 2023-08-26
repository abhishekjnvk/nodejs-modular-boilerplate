module.exports.routes = (router, serviceLocator) => {
  const homeControllerV1 = serviceLocator.get('homeControllerV1');
  const logger = serviceLocator.get('logger');

  router.get('/', (req, res, next) => {
    logger.info('home Router v1');
    homeControllerV1.home(req, res, next);
  });
};

// module.exports = router;
