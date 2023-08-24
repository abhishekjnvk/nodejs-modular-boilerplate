'use strict';

const { listModules } = require('awilix');
const serviceLocator = require('../app/helpers/service_locator');
const logger = serviceLocator.get('logger');
const path = require('path');
const models = listModules(path.join(__dirname, '../app/module/*/*.model.js'));


class Database{
  constructor() {
    this.mongoose = serviceLocator.get('mongoose');
  }

  async _connect(port, host, name, opts, replSet = '') {
    return new Promise((resolve, reject) => {
      this.mongoose.Promise = global.Promise;
      this.mongoose.set('strictQuery', false);

      if (replSet) {
        const hostArrStr = host;
        const hostURI = `mongodb://${hostArrStr}/${name}?replicaSet=${replSet}&readPreference=primary&appname=pp_server&ssl=false`;
        this.mongoose.connect(hostURI, opts);
      } else {
        const hostURI = `mongodb://${host}:${port}/${name}?readPreference=primary&appname=pp_server&ssl=false`;
        this.mongoose.connect(hostURI, opts);
      }

      const { connection } = this.mongoose;
      connection.on('connected', () => {
        logger.info('Database Connection was Successful');

        return resolve();
      });

      connection.on('error', err => {
        logger.info(`Database Connection Failed${err}`);

        return reject(err);
      });

      connection.on('disconnected', () =>
        logger.info('Database Connection Disconnected'),
      );

      process.on('SIGINT', () => {
        connection.close();
        logger.info(
          'Database Connection closed due to NodeJs process termination',
        );

        // eslint-disable-next-line no-process-exit
        process.exit(0);
      });

      models.forEach(model => {
        // eslint-disable-next-line security/detect-non-literal-require
        require(model.path);
      });
    });
  }

  async _disConnect() {
    this.mongoose.disconnect();
  }
}

module.exports = new Database();
