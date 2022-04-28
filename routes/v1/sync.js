const express = require('express');
const router = express.Router();
const validate = require('../../app/middlewares/validation');
const validationRules = require('../../app/validations/sync');
const controller = require('../../app/controllers/sync');
const authenticate = require('../../app/middlewares/jwt');

router.get('/', validationRules.sync(), validate, authenticate, controller.sync);

module.exports = router;
