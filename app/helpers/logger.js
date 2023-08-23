const winston = require('winston');

const logger = winston.createLogger(
  {
    level  : 'info',
    format : winston.format.combine(
      winston.format.timestamp({ format: 'YYYY/MM/DD h:mm:ss A' }),
      winston.format.printf(info => `${info.timestamp} : ${info.level} : ${info.message}`),
    ),
    transports : [
      new winston.transports.File({ filename: 'logs/info.log', level: 'info' }),
      new winston.transports.File({ filename: 'logs/combined.log' }),
    ],
  },
  {
    level      : 'debug',
    transports : [
      new winston.transports.File({ filename: 'logs/debug.log', level: 'debug' }),
      new winston.transports.File({ filename: 'logs/combined.log' }),
    ],
    format : winston.format.combine(
      winston.format.timestamp({ format: 'YYYY/MM/DD h:mm:ss A' }),
      winston.format.json(),
    ),
  },
  {
    level      : 'error',
    transports : [
      new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
      new winston.transports.File({ filename: 'logs/combined.log' }),
    ],
    format : winston.format.combine(
      winston.format.timestamp({ format: 'YYYY/MM/DD h:mm:ss A' }),
      winston.format.json(),
    ),
  }

);

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format : winston.format.combine(
      winston.format.colorize()
    ),
  }));
}

module.exports = logger;
