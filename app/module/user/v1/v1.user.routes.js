const { validateCreateUser, validateLogin } = require("./validator/user.validator")

module.exports.routes = (router, serviceLocator) => {
  const userControllerV1 = serviceLocator.get('userControllerV1');
  const logResponse = (req, res, next)  => {
    console.log(req.body)
    next();
  }
  router.post('/signup', logResponse,  validateCreateUser, (req, res, next) => {
    serviceLocator.get('logger').info('user signup Router v1');
    userControllerV1.signup(req, res, next);
  })

  router.post('/login', validateLogin, (req, res, next) => {
    serviceLocator.get('logger').info('user login Router v1');
    userControllerV1.login(req, res, next);
  })

}