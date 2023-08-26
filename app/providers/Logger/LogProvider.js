'use strict';

const pino = require('pino');
const httpContext = require('express-http-context');
const { REQUEST_ID_KEY, REQUEST_PATH_KEY, REQUEST_METHOD_KEY, SESSION_ID_KEY } = require('../../base/constants');

class Logger{
  constructor() {
    const options = {
      singleLine : true,
      mkdir      : true,
      hideObject : false,
    };
    const targets = [
      {
        level   : 'info',
        target  : 'pino/file',
        options : {
          ...options,
          destination : 'logs/info.log',
        },
      },
      {
        level   : 'debug',
        target  : 'pino/file',
        options : {
          ...options,
          destination : 'logs/debug.log',
        },
      },
      {
        level   : 'warn',
        target  : 'pino/file',
        options : {
          ...options,
          destination : 'logs/warn.log',
        },
      },
      {
        level   : 'error',
        target  : 'pino/file',
        options : {
          ...options,
          destination : 'logs/error.log',
        },
      },
    ];

    if (process.env.ENABLE_CONSOLE_OUTPUT) {
      targets.push({
        target  : 'pino-pretty',
        options : {
          colorize     : true,
          timestampKey : 'time',
          singleLine   : true,
          hideObject   : false,
          ignore       : 'hostname,session_id,request_path',
        },
      });
    }

    this.logger = pino(
      {
        level : process.env.LOG_LEVEL || 'info',
        hooks : {
          logMethod(inputArgs, method) {
            if (inputArgs.length >= 2) {
              const arg1 = inputArgs.shift();
              const arg2 = inputArgs.shift();

              return method.apply(this, [arg2, arg1, ...inputArgs]);
            }

            return method.apply(this, inputArgs);
          },
        },
        formatters : {
          log : obj => {
            const newObj = Object.assign({}, obj);
            newObj[REQUEST_ID_KEY] = httpContext.get(REQUEST_ID_KEY);
            newObj[SESSION_ID_KEY] = httpContext.get(SESSION_ID_KEY);
            newObj[REQUEST_PATH_KEY] = httpContext.get(REQUEST_PATH_KEY);
            newObj[REQUEST_METHOD_KEY] = httpContext.get(REQUEST_METHOD_KEY);

            return newObj;
          },
        },
      },
      pino.transport({
        targets,
      }),
    );
  }

  async info(...message) {
    this.logger.info(...message);
  }

  async warn(...message) {
    this.logger.warn(...message);
  }

  async debug(...message) {
    this.logger.debug(...message);
  }

  async error(...message) {
    this.logger.error(...message);
  }
}

module.exports = Logger;
