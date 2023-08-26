'use strict';
const serviceLocator = require('../helpers/service-locator');
const { expressjwt: jwt } = serviceLocator.get('expressJwt');
const { AUTH_TOKEN_KEY } = serviceLocator.get('constants');
const { JWT_SECRET } = serviceLocator.get('config');

const unauthorizedPaths = [
  /\/register/,
  /\/login/,
  /\/health/,
  /\/verification/,
  /\/resendtoken/,
  /\/forgotpassword/,
  /\/resetpassword/,
];

function getToken(req) {
  let authToken = req.cookies[AUTH_TOKEN_KEY] || '';
  if (!authToken) {
    if (
      req.headers.authorization &&
      req.headers.authorization?.split(' ')[0] === 'Bearer'
    ) {
      authToken = req.headers.authorization.split(' ')[1];
    }
  }

  return authToken;
}

const Auth = jwt({
  secret              : JWT_SECRET,
  algorithms          : ['HS256'],
  credentialsRequired : true,
  getToken,
}).unless({
  path : unauthorizedPaths,
});

module.exports = { Auth };
