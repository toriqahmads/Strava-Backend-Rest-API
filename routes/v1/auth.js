const express = require('express');
const router = express.Router();
const validate = require('../../app/middlewares/validation');
const validationRules = require('../../app/validations/auth');
const controller = require('../../app/controllers/auth');
const authenticate = require('../../app/middlewares/jwt');

router.get('/stravalogin', controller.getLogin);
router.post('/login', validationRules.login(), validate, controller.login);
router.get('/logout', validationRules.logout(), validate, authenticate, controller.logout);
router.post('/refresh-token', validationRules.refreshToken(), validate, controller.refreshToken);

module.exports = router;
