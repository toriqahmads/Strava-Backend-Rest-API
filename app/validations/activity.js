const { query, param, header } = require('express-validator');

const findAll = () => {
  return [
    header('authorization')
      .exists()
      .notEmpty()
      .isString(),
    query('athlete_id')
      .optional()
      .notEmpty()
      .isNumeric(),
    query('type')
      .optional()
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

const destroy = () => {
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
  findAll,
  destroy
};
