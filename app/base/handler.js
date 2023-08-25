// Handle All Errors
module.exports = function(app, serviceLocator) {
  const logger = serviceLocator.get('logger');
  const httpStatus = serviceLocator.get('httpStatus');

  setTimeout(() => {
    logger.info("Registered error handler")
    // eslint-disable-next-line no-unused-vars
    app.use((err, req, res, next) => {
      // handle 500 errors
      logger.error(`Error: ${err}`)
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
        code  : httpStatus.INTERNAL_SERVER_ERROR,
        error : 'Something failed!'
      })
    })

    app.all("*", (_, res) => {
      logger.error('Error 404');
      res.status(httpStatus.NOT_FOUND).send({
        code    : httpStatus.NOT_FOUND,
        message : 'Not Found',
      });
    })

  }, 2000);  // wait for all routes to be registered

}
