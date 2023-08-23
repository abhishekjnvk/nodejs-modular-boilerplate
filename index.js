require('dotenv').config()
const express = require('express')
const app = express()
const serviceLocator = require('./app/helpers/service_locator');
const logger = serviceLocator.get('logger')
const PORT= process.env.PORT || 8080
const Database = require('./config/database');
const config = require('./config/app_config');
// const { clientErrorHandler } = require('./app/base/handler')

require("./app/base/middleware")(app)
require("./app/base/routes")(app)
require("./app/base/handler")(app, serviceLocator)
// app.use(clientErrorHandler)


const startServer = async () => {
  const mongoConfig = config.mongo;
  const opts = {
    user            : mongoConfig.user,
    pass            : mongoConfig.pass,
    authSource      : mongoConfig.authdb,
    useNewUrlParser : true,
  };

  const host = mongoConfig.replSet ? mongoConfig.hostArr : mongoConfig.host;
  logger.info("Waiting for Database to connect...");

  await Database._connect(
    config.mongo.port,
    host,
    config.mongo.name,
    opts,
    mongoConfig.replSet
  );

  app.listen(PORT, () => {
    logger.info(`App listening on port ${PORT}!`)
  })
};

startServer();
