const {
  validateCreateUser,
  validateLogin,
  emailVerification,
  resetPasswordVerification,
  forgotPasswordVerification,
} = require('./validator/v1-user-validator');

module.exports.routes = (router, serviceLocator) => {
  const userControllerV1 = serviceLocator.get('userControllerV1');

  router.post('/register', validateCreateUser, (req, res, next) => {
    serviceLocator.get('logger').info('user register Router v1');
    userControllerV1.register(req, res, next);
  });

  router.post('/login', validateLogin, (req, res, next) => {
    serviceLocator.get('logger').info('user login Router v1');
    userControllerV1.login(req, res, next);
  });

  router.get('/email-verification', emailVerification, (req, res, next) => {
    serviceLocator.get('logger').info('user myProfile Router v1');
    userControllerV1.emailVerification(req, res, next);
  });

  router.post(
    '/forgot-password',
    forgotPasswordVerification,
    (req, res, next) => {
      serviceLocator.get('logger').info('user myProfile Router v1');
      userControllerV1.forgotPassword(req, res, next);
    },
  );

  router.post(
    '/reset-password',
    resetPasswordVerification,
    (req, res, next) => {
      serviceLocator.get('logger').info('user myProfile Router v1');
      userControllerV1.resetPassword(req, res, next);
    },
  );

  router.get('/me', (req, res, next) => {
    serviceLocator.get('logger').info('user myProfile Router v1');
    userControllerV1.myProfile(req, res, next);
  });
};