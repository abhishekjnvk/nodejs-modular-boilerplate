const { validateCreateUser, validateLogin, emailVerification } = require("./validator/user.validator")

module.exports.routes = (router, serviceLocator) => {
  const userControllerV1 = serviceLocator.get('userControllerV1');

  router.post('/register', validateCreateUser, (req, res, next) => {
    serviceLocator.get('logger').info('user register Router v1');
    userControllerV1.register(req, res, next);
  })

  router.post('/login', validateLogin, (req, res, next) => {
    serviceLocator.get('logger').info('user login Router v1');
    userControllerV1.login(req, res, next);
  })

  router.get('/me', (req, res, next) => {
    serviceLocator.get('logger').info('user myProfile Router v1');
    userControllerV1.myProfile(req, res, next);
  })

  router.get('/email-verification', emailVerification, (req, res, next) => {
    serviceLocator.get('logger').info('user myProfile Router v1');
    userControllerV1.emailVerification(req, res, next);
  })
}
