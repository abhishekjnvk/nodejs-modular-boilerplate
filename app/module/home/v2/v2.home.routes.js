module.exports.routes = (router, serviceLocator) => {
  const homeControllerV2 = serviceLocator.get('homeControllerV2');

  router.get('/', (req, res, next) => {
    homeControllerV2.home(req, res, next);
  })
}
