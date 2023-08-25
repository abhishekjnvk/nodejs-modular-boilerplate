class BaseService{
  constructor(opts, modelName = '') {
    this.logger = opts.logger;
    this.httpErrors = opts.httpErrors;
    this.httpStatus = opts.httpStatus;
    this.modelName = modelName;
    this.config = opts.config;
    this.utils = opts.utils;
    this.storageManager = opts.storageManager;
    this.databaseService = opts.databaseService;
    this.httpContext = opts.httpContext;
  }

  async parseResponseData(data = {}, token = '') {

    const reqId = this.httpContext.get('req_id');
    const result = {
      status : true,
      data,
      token,
      req_id : reqId,
    };
    this.logger.info("parsed response data")

    return result;
  }

  async home(version) {
    const { disk } = this.storageManager;
    try {
      this.logger.info(`BaseService home() ${version} called`);
      const requestId = this.httpContext.get('req_id');
      await this.databaseService.create(this.modelName, {
        request_id : requestId,
        version,
      });

      return {
        app_version : this.config.app_config.APP_VERSION,
        api_version : version,
        message     : 'Welcome to the home page',
        request_id  : requestId,
        files       : await disk.flatList(),
      };
    } catch (err) {
      this.logger.error(`BaseService home error: ${err}`);
      throw err;
    }
  }

  async __create(body, skipUId = false, opts = {}) {
    const _ = this;
    const result = await _.databaseService.create(
      _.modelName,
      body,
      skipUId,
      opts,
    );

    _.logger.info(`${_.modelName} created successfully`);

    return result;
  }

  async create(body, skipUId = false, opts = {}) {
    const _ = this;

    return await _.__create(body, skipUId, opts);
  }

  async __get(id) {
    const _ = this;
    const result = await _.databaseService.getById(_.modelName, id);

    if (!result) {
      const err = _.errs(
        this.httpStatus.NOT_FOUND,
        `${_.modelName} with id: ${id} does not exists`,
      );
      throw err;
    }

    _.logger.info(`${_.modelName} fetched successfully`);

    return result;
  }

  async get(id) {
    const _ = this;

    return await _.__get(id);
  }

  async __updateMany(query, body, opts = {}) {
    const _ = this;
    const res = await _.databaseService.updateMany(
      _.modelName,
      query,
      body,
      opts,
    );

    _.logger.info(`${_.modelName} updated successfully`);

    return res;
  }

  async updateMany(query, body, opts) {
    const _ = this;

    return await _.__updateMany(query, body, opts);
  }

  async __getOne(query, noErr = false, projections = null) {
    const _ = this;

    const result = await _.databaseService.getOneByQuery(
      _.modelName,
      query,
      noErr,
      projections,
    );
    _.logger.info(`${_.modelName} fetched successfully`);

    return result;
  }

  async getOne(query, noErr, projections) {
    const _ = this;

    return await _.__getOne(query, noErr, projections);
  }

  async __delete(id) {
    const _ = this;
    const result = await _.databaseService.delete(_.modelName, id);

    if (!result) {
      const err = _.errs(
        this.httpStatus.NOT_FOUND,
        `${_.modelName} with id: ${id} could not be deleted`,
      );
      throw err;
    }

    _.logger.info(`${_.modelName} with id: ${id} deleted successfully`);

    return result;
  }

  async delete(id) {
    const _ = this;

    return await _.__delete(id);
  }

  async __update(id, body, opts = {}) {
    const _ = this;

    const result = await _.databaseService.update(_.modelName, id, body, opts);

    _.logger.info(`${_.modelName} with id: ${id} updated successfully`);

    return result;
  }

  async update(id, body, opts) {
    const _ = this;

    return await _.__update(id, body, opts);
  }

  async __softDelete(id, opts) {
    const _ = this;
    const updRec = {
      is_active : false,
    };

    const result = await _.__update(id, updRec, opts);
    _.logger.info(
      `${_.modelName} with id: ${id} marked as deleted successfully`,
    );

    return result;
  }

  async softDelete(id, opts) {
    const _ = this;

    return await _.__softDelete(id, opts);
  }

  async __insertMany(itemsArr, opts = {}) {
    const _ = this;

    const result = await _.databaseService.insertMany(
      _.modelName,
      itemsArr,
      opts,
    );
    _.logger.info(`${_.modelName} inserted many items`);

    return result;
  }

  async insertMany(itemsArr, opts) {
    const _ = this;

    return await _.__insertMany(itemsArr, opts);
  }

  async __deleteMany(query) {
    const _ = this;

    await _.databaseService.deleteMany(_.modelName, query);

    _.logger.info(`${_.modelName} deleted many items`);

    return true;
  }

  async deleteMany(query) {
    const _ = this;

    return await _.__deleteMany(query);
  }

  async __getAll(query) {
    const _ = this;

    const result = await _.databaseService.getByQuery(_.modelName, query);
    _.logger.info(`${_.modelName} fetched successfully`);

    return result;
  }

  async getAll(query) {
    const _ = this;

    return await _.__getAll(query);
  }

  async __getAllLatestFirst(query) {
    const _ = this;
    const result = await _.databaseService.getByQueryAndSort(
      _.modelName,
      query,
      { sortOption: { createdAt: -1 } },
    );
    _.logger.info(`${_.modelName} fetched successfully`);

    return result;
  }

  async getAllLatestFirst(query) {
    const _ = this;

    return await _.__getAllLatestFirst(query);
  }

  async __getAllWithPagination(...params) {
    const [query, page, limit, sortOption = { createdAt: -1 }, projections] =
      params;

    const result = await this.databaseService.getByQueryAndSortWithPagination(
      this.modelName,
      query,
      { sortOption, projections },
      page,
      limit,
    );

    return result;
  }

  async getAllWithPagination(...params) {
    const _ = this;

    return await _.__getAllWithPagination(...params);
  }
}

module.exports = BaseService;
