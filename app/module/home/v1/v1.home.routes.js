const express = require("express");
const router = express.Router();
const serviceLocator=require('../../../helpers/service_locator');

router.get('/home', (req, res, next) => {
  serviceLocator.get('logger').info(`${req.req_id} home Route v1`);
  serviceLocator.get('homeControllerV1').home(req, res, next);
})


module.exports = router;
