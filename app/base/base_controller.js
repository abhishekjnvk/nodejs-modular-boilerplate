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
      this.logger.info(`home controller ${version}`);
      version = `${(version.substring(1, version.length))}`;
      const response = await this.service.home(version);
      res.send(response);
      res.end();
    } catch (err) {
      this.logger.error(`${this.name} home error: ${err}`);
      next(err);
    }
  }
}

module.exports = BaseController;
