const express = require('express');
const router = express.Router();
const validateInput = require('../../middlewares/validateInput');
const { loginSchema, registerSchema } = require('./auth.validation');

const authController = require('./auth.controller');

router.post(
  '/register',
  validateInput(registerSchema, 'body'),
  authController.register
);

router.post(
  '/login',
  validateInput(loginSchema, 'body'),
  authController.login
);

module.exports = router;
