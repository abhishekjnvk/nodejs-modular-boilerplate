'use strict';
const serviceLocator = require('../helpers/service-locator')
const { expressjwt: jwt } = serviceLocator.get("expressJwt");
const{ JWT_SECRET }= serviceLocator.get("config");

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
  if (
    req.headers.authorization &&
    req.headers.authorization.split(' ')[0] === 'Bearer'
  ) {
    return req.headers.authorization.split(' ')[1];
  } else if (req.query && req.query.token) {
    const token = req.query.token;
    delete req.query.token;

    return token;
  }

  return '';
}

module.exports.Auth = jwt({
  secret              : JWT_SECRET,
  algorithms          : ['HS256'],
  credentialsRequired : true,
  getToken,
}).unless({
  path : unauthorizedPaths,
});
