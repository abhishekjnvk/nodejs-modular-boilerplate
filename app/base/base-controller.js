'use strict';

class BaseController{
  constructor(opts, name = 'BaseController', serviceName) {
    this.logger = opts.logger;
    this.config = opts.config;
    this.utils = opts.utils;
    this.constants = opts.constants;
    this.service = opts[serviceName];
    this.name = name;
  }

  async home(req, res, next) {
    try {
      let version = req.originalUrl.split('/')[1];
      this.logger.info(`home controller ${version}`);
      version = `${version.substring(1, version.length)}`;
      const response = await this.service.home(version);
      res.send(response);
      res.end();
    } catch (err) {
      this.logger.error(`${this.name} home error: ${err}`);
      next(err);
    }
  }

  async create(req, res, next) {
    const _ = this;
    _.logger.info(`${_.name} create() called`);

    try {
      const { body, user = {}, opts = {} } = req;
      body.creator_id = user._id;
      body.creator_name = user.displayName;
      const result = await _.service.create(body, false, opts);

      res.send(result);
    } catch (err) {
      _.logger.error(err.message);
      next(err);
    }
  }

  async getAll(req, res, next) {
    const _ = this;
    _.logger.info(`${_.name} getAll() called`);

    try {
      const { query = {}, user } = req;
      const result = await _.service.getAll(query, user);

      res.send(result);
    } catch (err) {
      _.logger.error(err.message);
      next(err);
    }
  }

  async get(req, res, next) {
    const _ = this;
    _.logger.info(`${_.name} get() called`);

    try {
      const { id } = req.params;
      const result = await _.service.get(id);

      res.send(result);
    } catch (err) {
      _.logger.error(err.message);
      next(err);
    }
  }

  async getAllWithPagination(req, res, next) {
    this.logger.info(`${this.name} getAllWithPagination() called`);
    try {
      const { query } = req;
      const { page = 0, limit = 20, ...restQuery } = query;
      const result = await this.service.getAllWithPagination(
        restQuery,
        Number(page),
        Number(limit),
      );

      res.send(result);
    } catch (err) {
      this.logger.error(err.message);
      next(err);
    }
  }

  async update(req, res, next) {
    const _ = this;
    _.logger.info(`${_.name} update() called`);

    try {
      const {
        body,
        params: { id },
        opts = {},
      } = req;
      const result = await _.service.update(id, body, opts);

      res.send(result);
    } catch (err) {
      _.logger.error(err.message);
      next(err);
    }
  }

  async delete(req, res, next) {
    const _ = this;
    _.logger.info(`${_.name} delete() called`);

    try {
      const {
        params: { id },
        user = {},
      } = req;

      const opts = {
        userId   : user._id,
        userName : user.displayName,
      };

      const result = await _.service.delete(id, opts);

      res.send(result);
    } catch (err) {
      _.logger.error(err.message);
      next(err);
    }
  }

  async softDelete(req, res, next) {
    const _ = this;
    _.logger.info(`${_.name} softDelete() called`);

    try {
      const { id } = req.params;
      const { opts } = req;
      const result = await _.service.softDelete(id, opts);
      res.send(result);
    } catch (err) {
      _.logger.error(err.message);
      next(err);
    }
  }

  setCookie(cookieObject = {}, res, maxAge = 86400000) {
    const _ = this;
    _.logger.info(`${_.name} setCookie() called`);
    try {
      for (const key in cookieObject) {
        if (Object.hasOwnProperty.call(cookieObject, key)) {
          const value = cookieObject[key];
          if (value) {
            res.cookie(key, value, { maxAge });
          }
        }
      }
      _.logger.info(`${_.name} setCookie() success`);
    } catch (err) {
      _.logger.error(err.message);
    }
  }

  setTokenInCookie(data, res) {
    const authToken = data[this.constants.AUTH_TOKEN_KEY];

    if (authToken) {
      const cookieObj = { [this.constants.AUTH_TOKEN_KEY]: authToken };
      this.setCookie(cookieObj, res);
    }
  }
}

module.exports = BaseController;
