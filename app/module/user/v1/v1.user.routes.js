const { validateCreateUser, validateLogin } = require("./validator/user.validator")

module.exports.routes = (router, serviceLocator) => {
  const userControllerV1 = serviceLocator.get('userControllerV1');

  router.post('/register',  validateCreateUser, (req, res, next) => {
    serviceLocator.get('logger').info('user register Router v1');
    userControllerV1.register(req, res, next);
  })

  router.post('/login', validateLogin, (req, res, next) => {
    serviceLocator.get('logger').info('user login Router v1');
    userControllerV1.login(req, res, next);
  })

}
