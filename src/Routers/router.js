const express = require('express');
const router = express.Router();

const { signUp, signIn } = require('../Controllers/adminController');
const { createOrganization, getOrganizations, updateOrganization } = require('../Controllers/orgController');
const { auth } = require('../Middleware/auth');
const { validate, signUpValidator, signInValidator, createOrgValidator, updateOrgValidator } = require('../Middleware/validator');

router.post('/sign-up', signUpValidator, validate, signUp);
router.post('/sign-in', signInValidator, validate, signIn);

router.post('/create-organization',createOrgValidator, validate, auth, createOrganization);
router.get('/get-organization', getOrganizations);
router.put('/update-organization/:organizationId', updateOrgValidator, updateOrganization)

module.exports = router;