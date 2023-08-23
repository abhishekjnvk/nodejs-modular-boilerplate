const express = require("express");
const router = express.Router();
const serviceLocator=require('../../../helpers/service_locator');


router.get('/', (req, res, next) => {
  serviceLocator.get('homeControllerV2').home(req, res, next);
})


module.exports = router;
