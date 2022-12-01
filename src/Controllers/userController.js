const jwt = require("jsonwebtoken");

const userModel = require("../models/userModel");
const { sendError } = require("../Utils/helper");

exports.signUp = async (req, res) => {
    let data = req.body;
    let { email, phone } = data;

    let emailExists = await userModel.findOne({ email });
    if (emailExists) {
        return sendError(res, "Email already exists");
    }

    let phoneExists = await userModel.findOne({ phone });
    if (phoneExists) {
        return sendError(res, "Phone already exists");
    }

    const newUser = new userModel(req.body);
    await newUser.save();

    return res.status(201).json({ msg: "Sign-Up Success", data: newUser });
};

exports.signIn = async (req, res) => {
    let { email, password } = req.body;

    let user = await userModel.findOne({ email });
    if (!user) {
        return sendError(res, "Invalid credentials");
    }
    let checkPassword = await user.comparePassword(password);
    if (!checkPassword) {
        return sendError(res, "Invalid credentials");
    }

    let token = jwt.sign(
      { userId: user._id },
      process.env.KEY,
      { expiresIn: 60 * 1000 }
    );
    return res
        .status(200)
        .json({ msg: "Login successful", data: { token: token } });
};
