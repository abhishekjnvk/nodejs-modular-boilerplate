const { nanoid } = require('nanoid');
const httpContext = require('express-http-context');

const uniqueReqId = (req, res, next) => {
  const reqId = nanoid();
  httpContext.set('req_id', reqId);
  next();
};

module.exports = uniqueReqId;
