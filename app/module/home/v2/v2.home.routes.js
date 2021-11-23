const express = require("express");
const router = express.Router();
const service_locator=require('../../../helpers/service_locator');


router.get('/', function (req, res, next) {
    service_locator.get('homeControllerV2').home(req,res,next);
})


module.exports = router;
