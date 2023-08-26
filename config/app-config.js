const appConfig = {
  APP_NAME: process.env.APP_NAME || 'My App',
  APP_PORT: process.env.APP_PORT || 8080,
  APP_VERSION: process.env.APP_VERSION || '1.0.0',
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:3000',
  SALT_ROUNDS: process.env.SALT_ROUNDS || 10,
  ENABLE_CONSOLE_OUTPUT: process.env.ENABLE_CONSOLE_OUTPUT == 'false' || true,
  JWT_SECRET: process.env.JWT_SECRET || 'hakuna-matata',
  JWT_EXPIRY: Number(process.env.JWT_EXPIRY_IN_MS) || 24 * 60 * 60 * 1000 * 30, // 30 Days (milliseconds)
  REQUEST_MAX_SIZE_IN_MB: Number(process.env.REQUEST_MAX_SIZE_IN_MB) || 25,
  mongo: {
    port: Number(process.env.DB_PORT) || 27017,
    host: process.env.DB_HOST || 'localhost',
    name: process.env.DB_NAME || 'node-modular',
    user: process.env.DB_USER || '',
    pass: process.env.DB_PASS,
    authdb: process.env.DB_AUTH_DB,
    replSet: process.env.DB_REPL_SET || '',
    hostArr: process.env.DB_HOST_ARR,
  },
  mail: {
    enabled:
      Boolean(process.env.MAIL_HOST) &&
      Boolean(process.env.MAIL_USER) &&
      Boolean(process.env.MAIL_PASS),
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT) || 587,
    username: process.env.MAIL_USER,
    password: process.env.MAIL_PASS,
    ssl: process.env.MAIL_SSL == 'true' || false,
  },
  cors: {
    domains:
      process.env.CORS_ALLOWED_DOMAIN?.split(',').map((d) => d.trim()) || [],
  },
};

module.exports = appConfig;
