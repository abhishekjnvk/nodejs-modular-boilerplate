class BaseService{
  constructor(opts, modelName = '') {
    this.logger = opts.logger;
    this.modelName = modelName;
    this.config = opts.config;
    this.storageManager = opts.storageManager;
    this.databaseService = opts.databaseService;
    this.httpContext = opts.httpContext;
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
}

module.exports = BaseService;
