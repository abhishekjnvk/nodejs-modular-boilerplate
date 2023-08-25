require('dotenv').config()
const express = require('express')
const app = express()
const serviceLocator = require('./app/helpers/service_locator');
const logger = serviceLocator.get('logger')
const event = serviceLocator.get('event')
const PORT= process.env.PORT || 8080
const Database = require('./config/database');
const config = require('./config/app_config');
const router = express.Router();

require('./app/base/events');
require("./app/base/middleware")(app)
require("./app/base/routes")(app, router)
require("./app/base/handler")(app, serviceLocator)

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
    event.fire("server::started", { message: `App listening on port ${PORT}!` })
  })
};

startServer();
