const authService = require('../services/auth');
const JwtError = require('../exceptions/jwt-token');

const authenticate = async (req, res, next) => {
  try {
    let { authorization } = req.headers;
    if (!authorization || authorization === '') {
      throw new JwtError();
    }

    if (authorization.startsWith('Bearer ')) {
      authorization = authorization.split(' ')[1].trim();
    }

    const verify = await authService.verifyAndDecodeJwtToken(authorization);
    req.user = verify;

    return next();
  } catch (err) {
    return next(err);
  }
};

module.exports = authenticate;
