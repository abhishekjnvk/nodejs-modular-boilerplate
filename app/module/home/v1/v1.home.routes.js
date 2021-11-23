const express = require("express");
const router = express.Router();
const service_locator=require('../../../helpers/service_locator');

router.get('/', function (req, res, next) {
    service_locator.get('logger').info('home Route v1');
    service_locator.get('homeControllerV1').home(req,res,next);
})


module.exports = router;
