const express = require('express');
const router = express.Router();

const { signUp, signIn } = require('../Controllers/userController');
const { validate, signUpValidator, signInValidator } = require('../Middleware/validator');

router.post('/sign-up', signUpValidator, validate, signUp);
router.post('/sign-in', signInValidator, validate, signIn);

module.exports = router;