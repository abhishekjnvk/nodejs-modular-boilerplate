const cuid = require('cuid');

const uniqueReqId = (req, res, next) => {
  req.req_id=cuid();
  next();
};

module.exports = uniqueReqId;
