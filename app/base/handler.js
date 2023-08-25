const { isCelebrateError } = require('celebrate');
const httpErrors = require('http-errors');
const httpStatus = require('http-status');
const Logger = require('../providers/Logger');
const logger = new Logger();

function handleCelebrateError(err) {
  if (!isCelebrateError(err)) {
    return err;
  }

  let errorBody;
  const httpErr = httpErrors(httpStatus.BAD_REQUEST, 'Bad request parameters');
  // 'details' is a Map()
  if (err.details.has('body')) {
    errorBody = err.details.get('body');
    const {
      details: [errorDetails],
    } = errorBody;
    logger.error(errorDetails.message);
    logger.debug(errorDetails);
  } else if (err.details.has('params')) {
    errorBody = err.details.get('params');
    logger.error(errorBody.message);
    logger.debug(errorBody);
  } else if (err.details.has('query')) {
    errorBody = err.details.get('query');
    logger.error(errorBody.message);
    logger.debug(errorBody);
  } else {
    logger.error('default validation error');
    logger.debug('default validation error');
  }

  return httpErr;
}

// Handle All Errors
module.exports = function(app, serviceLocator) {
  const logger = serviceLocator.get('logger');
  const httpStatus = serviceLocator.get('httpStatus');
  const httpContext = serviceLocator.get('httpContext')
  const constants = serviceLocator.get('constants')

  setTimeout(() => {
    logger.info("Registered error handler")
    // eslint-disable-next-line no-unused-vars
    app.use((err, req, res, next) => {
      err = handleCelebrateError(err);
      const code = err.statusCode || 500
      const message = err.message || "Something went wrong";
      const requestId = httpContext.get(constants.REQUEST_ID_KEY);
      const sessionId = httpContext.get(constants.SESSION_ID_KEY);
      res.status(code).json({
        status     : false,
        code       : String(code),
        message,
        request_id : requestId,
        session_id : sessionId
      });
    })

    app.all("*", (_, res) => {
      logger.error('Error 404');
      res.status(httpStatus.NOT_FOUND).send({
        code    : httpStatus.NOT_FOUND,
        message : 'Not Found',
      });
    })
  }, 2000);
}
