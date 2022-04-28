const { body, header } = require('express-validator');

const login = () => {
  return [
    body('code')
      .exists()
      .notEmpty()
      .isString()
  ];
}

const logout = () => {
  return [
    header('authorization')
      .exists()
      .notEmpty()
      .isString()
  ];
}

const refreshToken = () => {
  return [
    body('refresh_token')
      .exists()
      .notEmpty()
      .isString()
  ];
}

module.exports = {
  login,
  logout,
  refreshToken
};
