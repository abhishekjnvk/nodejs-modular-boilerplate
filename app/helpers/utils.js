const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const {
  SALT_ROUNDS,
  JWT_SECRET,
  JWT_EXPIRY,
} = require('../../config/app-config');

const compare = async (plainText, hashText) => {
  const isMatch = await bcrypt.compare(plainText, hashText);

  return isMatch;
};

const getBcryptHash = async str => {
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  const hash = await bcrypt.hash(str, salt);

  return hash;
};

const verifyJWT = async token =>
  new Promise((resolve, reject) => {
    jwt.verify(token, JWT_SECRET, (err, decodedData) => {
      if (err) {
        reject(err);
      }

      resolve(decodedData);
    });
  });

const signToken = async (data, expireMS = 0) => {
  const expireTime = !expireMS ? Number(JWT_EXPIRY) : expireMS;
  const opts = {
    expiresIn : `${expireTime}`,
  };

  return new Promise((resolve, reject) => {
    jwt.sign(data, JWT_SECRET, opts, (err, token) => {
      if (err) {
        return reject(err);
      }

      return resolve(token);
    });
  });
};

module.exports = {
  compare,
  getBcryptHash,
  verifyJWT,
  signToken,
};
