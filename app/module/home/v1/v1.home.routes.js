const express = require("express");
const router = express.Router();
const service_locator=require('../../../helpers/service_locator');

router.get('/', function (req, res, next) {
    service_locator.get('logger').info(req.req_id+' home Route v1');
    service_locator.get('homeControllerV1').home(req,res,next);
})


module.exports = router;
