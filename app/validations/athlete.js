const { query, param, header } = require('express-validator');

const findAll = () => {
  return [
    header('authorization')
      .exists()
      .notEmpty()
      .isString()
  ]
}

const findById = () => {
  return [
    header('authorization')
      .exists()
      .notEmpty()
      .isString(),
    param('id')
      .exists()
      .notEmpty()
      .isNumeric()
  ]
}

module.exports = {
  findById,
  findAll
};
