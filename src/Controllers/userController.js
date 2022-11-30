const userModel = require('../models/userModel');
const { sendError } = require('../Utils/helper');

exports.signUp = async (req, res) => {
  let {firstName, LastName, email, password, phone} = req.body;

  let emailExists = await userModel.findOne({email});
  if(emailExists){
    return sendError(res, "Email already exists");
  }

  let phoneExists = await userModel.findOne({phone});
  if(phoneExists){
    return sendError(res, "Phone already exists");
  }

  const newUser = new userModel(req.body);
  await newUser.save();

  return res.status(201).json({ msg: "Sign-Up Success", data: newUser});
}