const { nanoid } = require('nanoid');
const httpContext = require('express-http-context');
const { REQUEST_ID_KEY, SESSION_ID_KEY, REQUEST_PATH_KEY, REQUEST_METHOD_KEY } = require('../base/constants');

const uniqueReqId = (req, res, next) => {
  let sessionId = req.cookies[SESSION_ID_KEY];
  if(!sessionId) {
    sessionId = nanoid()
    res.cookie(SESSION_ID_KEY, sessionId, { maxAge: 3600000 });
  }
  const reqId = nanoid();
  res.setHeader(REQUEST_ID_KEY, reqId);

  httpContext.set(SESSION_ID_KEY, sessionId);
  httpContext.set(REQUEST_ID_KEY, reqId);
  httpContext.set(REQUEST_PATH_KEY, req.path);
  httpContext.set(REQUEST_METHOD_KEY, req.method);
  next();
};

module.exports = uniqueReqId;
