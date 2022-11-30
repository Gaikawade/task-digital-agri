const { check, validationResult } = require('express-validator');

exports.userValidator = [
  check("firstName").trim().not().isEmpty().withMessage("First Name is missing"),
  check("lastName").trim().not().isEmpty().withMessage("Last Name is missing"),
  check("email").normalizeEmail().isEmail().withMessage("Email is invalid"),
  check("password")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Password is missing")
      .isLength({ min: 8, max: 20 })
      .withMessage("Password must be 8 to 20 characters long"),
  check("phone")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Phone is missing")
      .isLength({ min: 8, max: 20 })
      .isInt()
      .withMessage("Phone number must be a number")
      .isFullWidth(10)
      .withMessage("Phone number must contain 10 digits only")
];

exports.validate = (req, res, next) => {
  const err = validationResult(req).array();
  if(err.length){
    return res.status(400).json({msg: err[0].msg});
  }
  next();
}