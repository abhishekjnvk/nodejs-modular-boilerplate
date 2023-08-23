
const bodyParser = require("body-parser");
const cors = require('cors');
const httpContext = require('express-http-context');
const compression = require('compression');
const useragent = require('express-useragent');



const serviceLocator = require('../helpers/service_locator');
const uniqueReqId = serviceLocator.get('uniqueReqId');

// Allowed API Versions
const versions=['v1', 'v2']
// Allowed Origins
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:3002',
]

module.exports = function(app) {
  app.use(httpContext.middleware);
  app.use(useragent.express());
  app.use(uniqueReqId);
  app.disable('x-powered-by');
  app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }));
  app.use(bodyParser.json());
  app.use(compression());

  app.use(cors({
    origin(origin, callback) {
      if(!origin) {return callback(null, true);}
      if(allowedOrigins.indexOf(origin) === -1) {
        const msg = 'The CORS policy for this site does not allow access from the specified Origin.';

        return callback(new Error(msg), false);
      }

      return callback(null, true);
    },
    methods : ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
  }));


  app.use((req, res, next) => {
    const version = (req.originalUrl).split('/')[1];
    if(versions.indexOf(version)==-1) {
      res.status(404).send('Invalid API VERSION');
    }else{
      next();
    }
  });
}
