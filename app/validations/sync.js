const { header } = require('express-validator');

const sync = () => {
  return [
    header('authorization')
      .exists()
      .notEmpty()
      .isString()
  ];
}

module.exports = {
  sync
};
