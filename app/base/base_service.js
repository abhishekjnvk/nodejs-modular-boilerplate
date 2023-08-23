class BaseService{
  constructor(opts, modelName = '') {
    this.logger = opts.logger;
    this.modelName = modelName;
    this.config = opts.config;
    this.storage_manager = opts.storage_manager;
    this.databaseService=opts.databaseService;
  }

  async home(version, requestId) {
    const { disk }=this.storage_manager;
    try {
      this.logger.info(`${requestId} BaseService home() ${version} called`);
      await this.databaseService.create(this.modelName, { request_id: requestId, version });

      return {
        app_version : this.config.app_config.app_version,
        api_version : version,
        message     : 'Welcome to the home page',
        files       : await disk.flatList()
      }
    } catch (err) {
      this.logger.error(`BaseService home error: ${err}`);
      throw err;
    }
  }
}

module.exports = BaseService;
