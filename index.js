require('dotenv').config()
const express = require('express')
const app = express()
const serviceLocator = require('./app/helpers/service_locator');
const PORT=process.env.PORT || 8080

require("./app/base/middleware")(app)
require("./app/base/routes")(app)
require("./app/base/handler")(app)


app.listen(PORT, function () {
  serviceLocator.get('logger').info(`Example app listening on port ${PORT}!`)
})