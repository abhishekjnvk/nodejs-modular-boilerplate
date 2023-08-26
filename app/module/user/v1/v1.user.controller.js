const BaseController = require('../../../base/base_controller');

class UserControllerV1 extends BaseController{
  constructor(opts) {
    super(opts, 'UserControllerV1', 'userServiceV1');
  }

  async register(req, res, next) {
    try {
      const { body }=req
      this.logger.info(`${this.name} register called`);
      const response = await this.service.register(body);
      res.send(response);
      res.end();
      this.logger.info(`${this.name} register successful`);
    } catch (err) {
      this.logger.error(`${this.name} register error: ${err}`);
      next(err);
    }
  }

  async login(req, res, next) {
    try {
      const { body }=req
      this.logger.info(`${this.name} login called`);
      const response = await this.service.login(body);
      res.send(response);
      res.end();
      this.logger.info(`${this.name} login successful`);
    } catch (err) {
      this.logger.error(`${this.name} login error: ${err}`);
      next(err);
    }
  }

}

module.exports = UserControllerV1;
