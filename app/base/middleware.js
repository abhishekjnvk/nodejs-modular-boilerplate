const serviceLocator = require('../helpers/service_locator');
const uniqueReqId = serviceLocator.get('uniqueReqId');
const bodyParser = require("body-parser");
const cors = require('cors')

//Allowed API Versions
const versions=['v1','v2']
//Allowed Origins
const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:3002',
]

module.exports = function(app){

    app.use(uniqueReqId);
    app.disable('x-powered-by');
    app.use(bodyParser.urlencoded({ extended: false ,limit: '50mb'}));
    app.use(bodyParser.json());

    app.use(cors({
        origin: function(origin, callback){
            if(!origin) return callback(null, true);
            if(allowedOrigins.indexOf(origin) === -1){
                var msg = 'The CORS policy for this site does not allow access from the specified Origin.';
                return callback(new Error(msg), false);
            }
            return callback(null, true);
        },
        methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
    }));
    

    app.use(function(req, res, next){
        let version = (req.originalUrl).split('/')[1];
        if(versions.indexOf(version)==-1){
            res.status(404).send('Invalid API VERSION');
        }else{
            next();
        }
    });
}
