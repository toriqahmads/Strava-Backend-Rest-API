const express = require('express');
const router = express.Router();
const validate = require('../../app/middlewares/validation');
const validationRules = require('../../app/validations/athlete');
const controller = require('../../app/controllers/athlete');
const authenticate = require('../../app/middlewares/jwt');

router.get('/', validationRules.findAll(), validate, authenticate, controller.findAll);
router.get('/:id', validationRules.findById(), validate, authenticate, controller.findById);

module.exports = router;
