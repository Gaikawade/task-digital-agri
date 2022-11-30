const express = require('express');
const router = express.Router();

const { signUp } = require('../Controllers/userController');
const { userValidator, validate } = require('../Middleware/validator');

router.post('/sign-up', userValidator, validate, signUp);

module.exports = router;