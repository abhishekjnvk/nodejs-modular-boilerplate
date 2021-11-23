const BaseController = require('../../../base/base_controller');

class HomeControllerV1 extends BaseController{
  constructor(opts) {
    super(opts, 'HomeControllerV1', 'homeServiceV1');

  }
}

module.exports = HomeControllerV1;
