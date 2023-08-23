'use strict';

class BaseController{
  constructor(opts, name = 'BaseController', serviceName) {
    this.logger = opts.logger;
    this.config = opts.config;
    this.service = opts[serviceName];
    this.name = name;
  }

  async home(req, res, next) {
    try {
      let version = req.originalUrl.split('/')[1];
      const reqId = req.req_id;
      this.logger.info(`${reqId} home controller ${version}`);
      version = `${version.substring(1, version.length)}.0.0`;
      let response = await this.service.home(version, reqId);
      response = { ...response, req_id: reqId };
      res.send(response);
      res.end();
    } catch (err) {
      this.logger.error(`${this.name} home error: ${err}`);
      next(err);
    }
  }
}

module.exports = BaseController;
