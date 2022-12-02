const { isValidObjectId } = require("mongoose");
const orgModel = require("../Models/orgModel");
const { sendError } = require("../Utils/helper");

exports.createOrganization = async (req, res) => {
    let data = req.body;
    let { adminId, name, email, phone } = data;

    if (!isValidObjectId(adminId)) {
        return sendError(res, "Invalid admin Id");
    }

    if(adminId !== req.adminId){
      return sendError(res, "Unauthorized access");
    }

    let organization = await orgModel.findOne({name});
    if(organization){
      return sendError(res, "The organization you are trying to add is already exists");
    }
    let emailExists = await orgModel.findOne({ email });
    if (emailExists) {
        return sendError(res, "Email already exists");
    }
    let phoneExists = await orgModel.findOne({ phone });
    if (phoneExists) {
        return sendError(res, "Phone already exists");
    }

    const newOrganization = new orgModel(req.body);
    await newOrganization.save();

    return res.status(201).json({msg: "Organization added successfully", data: newOrganization});
};

exports.getOrganizations = async (req, res) =>{

}