const BaseController = require('../../../base/base-controller');

class UserControllerV1 extends BaseController {
  constructor(opts) {
    super(opts, 'UserControllerV1', 'userServiceV1');
  }

  async register(req, res, next) {
    try {
      const { body } = req;
      this.logger.info(`${this.name} register called`);
      const response = await this.service.register(body);
      this.setTokenInCookie(response, res);
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
      const { body } = req;
      this.logger.info(`${this.name} login called`);
      const response = await this.service.login(body);
      this.setTokenInCookie(response, res);
      res.send(response);
      res.end();
      this.logger.info(`${this.name} login successful`);
    } catch (err) {
      this.logger.error(`${this.name} login error: ${err}`);
      next(err);
    }
  }

  async emailVerification(req, res, next) {
    try {
      const {
        query: { token },
      } = req;
      this.logger.info(`${this.name} emailVerification called`);
      const response = await this.service.emailVerification(token);
      this.setTokenInCookie(response, res);
      res.send(response);
      res.end();
      this.logger.info(`${this.name} emailVerification successful`);
    } catch (err) {
      this.logger.error(`${this.name} emailVerification error: ${err}`);
      next(err);
    }
  }

  async myProfile(req, res, next) {
    try {
      const { auth } = req;
      this.logger.info(`${this.name} myProfile called`);
      const response = await this.service.myProfile(auth);
      res.send(response);
      res.end();
      this.logger.info(`${this.name} myProfile successful`);
    } catch (err) {
      this.logger.error(`${this.name} myProfile error: ${err}`);
      next(err);
    }
  }

  async resetPassword(req, res, next) {
    try {
      const {
        body: { password, token },
      } = req;
      this.logger.info(`${this.name} resetPassword called`);
      const response = await this.service.resetPassword(token, password);
      res.send(response);
      res.end();
      this.logger.info(`${this.name} resetPassword successful`);
    } catch (err) {
      this.logger.error(`${this.name} resetPassword error: ${err}`);
      next(err);
    }
  }

  async forgotPassword(req, res, next) {
    try {
      const {
        body: { email },
      } = req;
      this.logger.info(`${this.name} forgotPassword called`);
      const response = await this.service.forgotPassword(email);
      res.send(response);
      res.end();
      this.logger.info(`${this.name} forgotPassword successful`);
    } catch (err) {
      this.logger.error(`${this.name} forgotPassword error: ${err}`);
      next(err);
    }
  }
}

module.exports = UserControllerV1;
