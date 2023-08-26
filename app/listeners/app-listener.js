'use strict';
const serviceLocator = require('../helpers/service-locator');
const logger = serviceLocator.get('logger');

const AppListener = {
  startServer : ({ message }) => {
    logger.info(message);
  },
};

module.exports = AppListener;
