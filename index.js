require('dotenv').config()
const express = require('express')
const app = express()
const serviceLocator = require('./app/helpers/service_locator');
const PORT= process.env.PORT || 8080
const Database = require('./config/database');
const config = require('./config/app_config');

require("./app/base/middleware")(app)
require("./app/base/routes")(app)
require("./app/base/handler")(app)


const startServer = async () => {
  const mongoConfig = config.mongo;
  const opts = {
    user             : mongoConfig.user,
    pass             : mongoConfig.pass,
    authSource       : mongoConfig.authdb,
    useNewUrlParser  : true,
  };

  const host = mongoConfig.replSet ? mongoConfig.hostArr : mongoConfig.host;
  await Database._connect(
    config.mongo.port,
    host,
    config.mongo.name,
    opts,
    mongoConfig.replSet
  );

  app.listen(PORT, function () {
    serviceLocator.get('logger').info(`App listening on port ${PORT}!`)
  })

};

startServer();