const BaseService = require('../../../base/base_service');

class UserServiceV1 extends BaseService{
  constructor(opts) {
    super(opts, 'User');
  }

  normalizeData(data) {
    const _ = this;
    _.logger.info('Normalizing data');

    return {
      _id     : data._id,
      user_id : data._id,
      email   : data.email,
      name    : data.name,
    };
  }

  async signup(body) {
    const _ = this;
    const { email, password, name } = body;
    const prevUser = await _.__getOne({ email }, true);
    if (prevUser) {
      const httpErr = _.httpErrors(
        _.httpStatus.CONFLICT,
        'Email already exists',
      );
      throw httpErr;
    }

    const passwordHash = await _.utils.getBcryptHash(password);
    const newUser = {
      email,
      password : passwordHash,
      name,
    };
    const result = await _.__create(newUser);

    return result;
  }

  async login(body) {
    const _ = this;
    const { email, password } = body;
    const prevUser = await _.__getOne({ email }, true);
    if (!prevUser) {
      const httpErr = _.httpErrors(
        _.httpStatus.UNAUTHORIZED,
        'User or password does not match',
      );
      throw httpErr;
    }

    const isPasswordCorrect = await _.utils.compare(password, prevUser.password)
    if (!isPasswordCorrect) {
      const httpErr = _.httpErrors(
        _.httpStatus.UNAUTHORIZED,
        'User or password does not match',
      );
      throw httpErr;
    }

    const userData = _.normalizeData(prevUser);
    const token = await _.utils.signToken(userData);

    return _.parseResponseData(userData, token);
  }
}

module.exports = UserServiceV1;