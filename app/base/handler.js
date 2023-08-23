// Handle All Errors
module.exports = function(app, serviceLocator) {
  const logger = serviceLocator.get('logger')
  setTimeout(() => {
    logger.info("Registered error handler")
    // eslint-disable-next-line no-unused-vars
    app.use((err, req, res, next) => {
      // handle 500 errors
      logger.error(`Error: ${err}`)
      res.status(500).send({ error: 'Something failed!' })
    })

    app.all("*", (_, res) => {
      logger.error('Error 404');
      res.status(404).send({
        status  : 404,
        message : 'Not Found',
      });
    })

  }, 2000);  // wait for all routes to be registered

}
