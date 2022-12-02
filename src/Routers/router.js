const express = require('express');
const router = express.Router();

const { signUp, signIn } = require('../Controllers/adminController');
const { createOrganization } = require('../Controllers/orgController');
const { auth } = require('../Middleware/auth');
const { validate, signUpValidator, signInValidator, createOrgValidator } = require('../Middleware/validator');

router.post('/sign-up', signUpValidator, validate, signUp);
router.post('/sign-in', signInValidator, validate, signIn);

router.post('/create-organization',createOrgValidator, validate, auth, createOrganization);

module.exports = router;