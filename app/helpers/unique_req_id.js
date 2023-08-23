const cuid = require('cuid');
const httpContext = require('express-http-context');

const uniqueReqId = (req, res, next) => {
  const reqId = cuid();
  httpContext.set('req_id', reqId);
  next();
};

module.exports = uniqueReqId;
