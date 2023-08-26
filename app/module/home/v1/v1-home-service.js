const BaseService = require('../../../base/base-service');

class HomeServiceV1 extends BaseService {
  constructor(opts) {
    super(opts, 'Home');
  }
}

module.exports = HomeServiceV1;
