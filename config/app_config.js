module.exports = {
  APP_NAME    : process.env.APP_NAME || 'My App',
  APP_VERSION : process.env.APP_VERSION || '1.0.0',
  APP_EMAIL   : process.env.APP_EMAIL || 'bot@sample_app.com',
  API_HOST    : process.env.API_HOST || 'http://localhost:8080',
  SALT_ROUNDS : process.env.SALT_ROUNDS || 10,
  JWT_SECRET  : process.env.JWT_SECRET || "hakuna-matata",
  JWT_EXPIRY  : 24 * 60 * 60 * 1000 * 30, // 30 Days (milliseconds)
  APP_LOGO    :
    process.env.APP_LOGO ||
    'https://previews.123rf.com/images/aquir/aquir1311/aquir131100316/23569861-sample-grunge-red-round-stamp.jpg',
  APP_TIMEZONE           : process.env.APP_TIMEZONE || 'Asia/Kolkata',
  APP_DATE_FORMAT        : process.env.APP_DATE_FORMAT || 'DD-MM-YYYY',
  APP_TIME_FORMAT        : process.env.APP_TIME_FORMAT || 'HH:mm:ss',
  APP_DATETIME_FORMAT    : process.env.APP_DATETIME_FORMAT || 'DD-MM-YYYY HH:MM:SS',
  APP_DECIMAL_PLACES     : process.env.APP_DECIMAL_PLACES || 2,
  APP_DECIMAL_SEPARATOR  : '.',
  APP_THOUSAND_SEPARATOR : ',',
  APP_FILE_SIZE_LIMIT    : process.env.APP_FILE_SIZE_LIMIT || '10MB',
  MONGO_URL              : process.env.MONGO_URL || 'http://localhost:2',
  APP_TOKEN_SECRET       : process.env.APP_TOKEN_SECRET || 'myappsecret',
  APP_TOKEN_EXPIRE       : process.env.APP_TOKEN_EXPIRE || 60 * 60 * 24 * 30 * 1000, // 30 days
  mongo                  : {
    port    : process.env.DB_PORT || 27017,
    host    : process.env.DB_HOST || 'localhost',
    name    : process.env.DB_NAME || 'node-modular',
    dburi   : process.env.DB_URI || 'mongodb://localhost:27017',
    user    : process.env.DB_USER || '',
    pass    : process.env.DB_PASS,
    authdb  : process.env.DB_AUTH_DB,
    replSet : process.env.DB_REPL_SET || '',
    hostArr : process.env.DB_HOST_ARR,
  },
};

// # ################# Local DB #################
// # DB_PORT=27017
// # DB_HOST=127.0.0.1
// # DB_NAME=pp_dev_faizan
// # DB_USER=
// # DB_PASS=
