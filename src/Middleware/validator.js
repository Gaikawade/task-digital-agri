const { check, validationResult } = require("express-validator");

exports.signUpValidator = [
    check("firstName")
        .trim()
        .not()
        .isEmpty()
        .withMessage("First Name is missing"),
    check("lastName")
        .trim()
        .not()
        .isEmpty()
        .withMessage("Last Name is missing"),
    check("email")
        .trim()
        .not()
        .isEmpty()
        .withMessage("Email is missing")
        .normalizeEmail()
        .isEmail()
        .withMessage("Email is invalid"),
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
        .matches(/^(\+91)?0?[6-9]\d{9}$/g)
        .withMessage("Phone number must contain 10 digits only"),
];

exports.signInValidator = [
    check("email")
        .trim()
        .not()
        .isEmpty()
        .withMessage("Email is missing")
        .normalizeEmail()
        .isEmail()
        .withMessage("Email is invalid"),
    check("password").trim().not().isEmpty().withMessage("Password is missing"),
];

exports.createOrgValidator = [
    check("name").trim().not().isEmpty().withMessage("Name is missing"),
    check("email")
        .trim()
        .not()
        .isEmpty()
        .withMessage("Email is missing")
        .normalizeEmail()
        .isEmail()
        .withMessage("Email is invalid"),
    check("phone")
        .trim()
        .not()
        .isEmpty()
        .withMessage("Phone is missing")
        .matches(/^(\+91)?0?[6-9]\d{9}$/g)
        .withMessage("Phone number must contain 10 digits only"),
    check("headQuarters")
        .trim()
        .not()
        .isEmpty()
        .withMessage("Head Quarters is missing"),
    check("address.street")
        .trim()
        .not()
        .isEmpty()
        .withMessage("Street is missing"),
    check("address.landmark")
        .trim()
        .not()
        .isEmpty()
        .withMessage("Landmark is missing"),
    check("address.pincode")
        .trim()
        .not()
        .isEmpty()
        .withMessage("Pincode is missing")
        .matches(/^\d{6}$/g)
        .withMessage("Pincode must be a 6 digit number"),
    check("cropSeason")
        .trim()
        .not()
        .isEmpty()
        .withMessage("Crop season is missing")
];

exports.updateOrgValidator = [
    check("name").trim().isEmpty().withMessage("Name is missing"),
    check("email")
        .trim()
        .isEmpty()
        .withMessage("Email is missing")
        .normalizeEmail()
        .isEmail()
        .withMessage("Email is invalid"),
    check("phone")
        .trim()
        .isEmpty()
        .withMessage("Phone is missing")
        .matches(/^(\+91)?0?[6-9]\d{9}$/g)
        .withMessage("Phone number must contain 10 digits only"),
    check("headQuarters")
        .trim()
        .isEmpty()
        .withMessage("Head Quarters is missing"),
    check("address.street")
        .trim()
        .isEmpty()
        .withMessage("Street is missing"),
    check("address.landmark")
        .trim()
        .isEmpty()
        .withMessage("Landmark is missing"),
    check("address.pincode")
        .trim()
        .isEmpty()
        .withMessage("Pincode is missing")
        .matches(/^\d{6}$/g)
        .withMessage("Pincode must be a 6 digit number"),
    check("cropSeason")
        .trim()
        .isEmpty()
        .withMessage("Crop season is missing")
];

exports.validate = (req, res, next) => {
    const err = validationResult(req).array();
    if (err.length) {
        return res.status(400).json({ msg: err[0].msg });
    }
    next();
};
