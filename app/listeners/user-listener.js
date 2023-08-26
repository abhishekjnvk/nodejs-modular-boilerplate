'use strict';
const serviceLocator = require('../helpers/service-locator');
const emailTemplate = serviceLocator.get('emailTemplate');
const logger = serviceLocator.get('logger');

const UserListener = {
  signup : async ({ user }) => {
    try {
      logger.info('User listener signup() called');
      const { name, email } = user;
      await emailTemplate.emailVerificationMail(name, email);
      logger.info('User listener signup() succeeded');
    } catch (err) {
      logger.error(err);
    }
  },
};

module.exports = UserListener;
