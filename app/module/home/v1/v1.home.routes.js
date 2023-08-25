// const express = require("express");
// const router = express.Router();
// const serviceLocator=require('../../../helpers/service_locator');
module.exports.routes = (router, serviceLocator) => {
  router.get('/', (req, res, next) => {
    serviceLocator.get('logger').info('home Router v1');
    serviceLocator.get('homeControllerV1').home(req, res, next);
  })
}

// module.exports = router;
