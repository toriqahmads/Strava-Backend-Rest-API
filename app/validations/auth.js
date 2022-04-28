const { body, header, query } = require('express-validator');

const loginPost = () => {
  return [
    body('code')
      .exists()
      .notEmpty()
      .isString()
  ];
}

const loginGet = () => {
  return [
    query('code')
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
  loginGet,
  loginPost,
  logout,
  refreshToken
};
