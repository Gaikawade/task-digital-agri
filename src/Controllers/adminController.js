const jwt = require("jsonwebtoken");

const adminModel = require("../Models/adminModel");
const { sendError } = require("../Utils/helper");

exports.signUp = async (req, res) => {
    let data = req.body;
    let { email, phone } = data;

    let emailExists = await adminModel.findOne({ email });
    if (emailExists) {
        return sendError(res, "Email already exists");
    }

    let phoneExists = await adminModel.findOne({ phone });
    if (phoneExists) {
        return sendError(res, "Phone already exists");
    }

    const newAdmin = new adminModel(req.body);
    await newAdmin.save();

    return res.status(201).json({ msg: "Sign-Up Success", data: newAdmin });
};

exports.signIn = async (req, res) => {
    let { email, password } = req.body;

    let admin = await adminModel.findOne({ email });
    if (!admin) {
        return sendError(res, "Invalid credentials");
    }
    let checkPassword = await admin.comparePassword(password);
    if (!checkPassword) {
        return sendError(res, "Invalid credentials");
    }

    let token = jwt.sign(
      { adminId: admin._id },
      process.env.KEY,
      { expiresIn: 60 * 1000 }
    );

    res.setHeader(`Authorization`, token);
    return res
        .status(200)
        .json({ msg: "Login successful", data: { token: token } });
};
