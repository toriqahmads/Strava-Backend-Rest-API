const express = require('express');
const router = express.Router();
const validate = require('../../app/middlewares/validation');
const validationRules = require('../../app/validations/activity');
const controller = require('../../app/controllers/activity');
const authenticate = require('../../app/middlewares/jwt');

router.get('/', validationRules.findAll(), validate, authenticate, controller.findAll);
router.get('/:id', validationRules.findById(), validate, authenticate, controller.findById);
router.delete('/:id', validationRules.destroy(), validate, authenticate, controller.destroy);

module.exports = router;
