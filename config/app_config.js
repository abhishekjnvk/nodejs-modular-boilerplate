module.exports = {
        APP_NAME: process.env.APP_NAME || 'My App',
        APP_EMAIL: process.env.APP_EMAIL|| 'bot@sample_app.com',
        APP_URL: process.env.APP_URL || 'http://localhost:8080',
        APP_LOGO: process.env.APP_LOGO || 'https://previews.123rf.com/images/aquir/aquir1311/aquir131100316/23569861-sample-grunge-red-round-stamp.jpg',
        APP_TIMEZONE: process.env.APP_TIMEZONE || 'Asia/Kolkata',
        APP_DATE_FORMAT: process.env.APP_DATE_FORMAT || 'DD-MM-YYYY',
        APP_TIME_FORMAT: process.env.APP_TIME_FORMAT || 'HH:mm:ss',
        APP_DATETIME_FORMAT: process.env.APP_DATETIME_FORMAT ||  'DD-MM-YYYY HH:MM:SS',
        APP_DECIMAL_PLACES: process.env.APP_DECIMAL_PLACES || 2,
        APP_DECIMAL_SEPARATOR: '.',
        APP_THOUSAND_SEPARATOR: ',',
        APP_FILE_SIZE_LIMIT:  process.env.APP_FILE_SIZE_LIMIT || '10MB',
        APP_TOKEN_SECRET: process.env.APP_TOKEN_SECRET || 'myappsecret',
        APP_TOKEN_EXPIRE: process.env.APP_TOKEN_EXPIRE || 60 * 60 * 24 * 30 * 1000,     // 30 days
};