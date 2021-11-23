'use strict';
const BaseController = require('../../../base/base_controller');

class HomeControllerV2 extends BaseController{
  constructor(opts) {
    super(opts, 'HomeControllerV2', 'homeServiceV2');
  }
  
}

module.exports = HomeControllerV2;
