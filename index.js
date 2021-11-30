require('dotenv').config()
const express = require('express')
const app = express()
const serviceLocator = require('./app/helpers/service_locator');
const PORT=process.env.PORT || 8080
const Database = require('./config/database');

require("./app/base/middleware")(app)
require("./app/base/routes")(app)
require("./app/base/handler")(app)


const startServer = async () => {
  await Database._connect(process.env.MONGO_URL);

  app.listen(PORT, function () {
    serviceLocator.get('logger').info(`App listening on port ${PORT}!`)
  })

};

startServer();