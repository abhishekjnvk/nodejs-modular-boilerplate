module.exports.routes = (router, serviceLocator) => {
  router.get('/', (req, res, next) => {
    serviceLocator.get('homeControllerV2').home(req, res, next);
  })
}
