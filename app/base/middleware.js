const bodyParser = require('body-parser');
const cors = require('cors');
const compression = require('compression');
const useragent = require('express-useragent');
const { errors } = require('celebrate');
const express = require('express');
const cookieParser = require('cookie-parser');
const serviceLocator = require('../helpers/service-locator');
const { Auth } = require('./auth-middleware');
const uniqueReqId = serviceLocator.get('uniqueReqId');
const config = serviceLocator.get('config');
const httpContext = serviceLocator.get('httpContext');

const allowedOrigins = config.cors.domains || [];
module.exports = function (app) {
  app.use(httpContext.middleware);
  app.use(cookieParser());
  app.use(
    cors({
      origin(origin, callback) {
        if (!origin) {
          return callback(null, true);
        }
        if (allowedOrigins.indexOf(origin) === -1) {
          const msg =
            'The CORS policy for this site does not allow access from the specified Origin.';

          return callback(new Error(msg), false);
        }

        return callback(null, true);
      },
      methods : ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
    }),
  );

  app.use(useragent.express());
  app.use(uniqueReqId);
  app.use(errors());
  app.disable('x-powered-by');
  app.use(express.urlencoded({ extended: false }));
  app.use(bodyParser.json({ limit: `${config.REQUEST_MAX_SIZE_IN_MB}mb` }));
  app.use(
    bodyParser.urlencoded({
      limit    : `${config.REQUEST_MAX_SIZE_IN_MB}mb`,
      extended : false,
    }),
  );
  app.use(compression());
  app.use(Auth);
};
