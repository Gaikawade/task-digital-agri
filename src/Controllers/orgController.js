const { isValidObjectId } = require("mongoose");
const orgModel = require("../Models/orgModel");
const { sendError } = require("../Utils/helper");

exports.createOrganization = async (req, res) => {
    let data = req.body;
    let seasons = ["Kharif", "Rabi", "Zaid"];
    let { adminId, name, email, phone, cropSeason } = data;

    if (!isValidObjectId(adminId)) {
        return sendError(res, "Invalid admin Id");
    }

    if (adminId !== req.adminId) {
        return sendError(res, "Unauthorized access");
    }

    let organization = await orgModel.findOne({ name });
    if (organization) {
        return sendError(
            res,
            "The organization you are trying to add is already exists"
        );
    }
    let emailExists = await orgModel.findOne({ email });
    if (emailExists) {
        return sendError(res, "Email already exists");
    }
    let phoneExists = await orgModel.findOne({ phone });
    if (phoneExists) {
        return sendError(res, "Phone already exists");
    }

    data.cropSeason = cropSeason.split(",").map((x) => x.trim());
    let seasonCheck = data.cropSeason.every((x) =>
        seasons.some((y) => x === y)
    );
    if (!seasonCheck) {
        return sendError(
            res,
            "Crop seasons have only Kharif, Rabi and Zaid only"
        );
    }

    const newOrganization = new orgModel(req.body);
    await newOrganization.save();

    return res.status(201).json({
        msg: "Organization added successfully",
        data: newOrganization,
    });
};

exports.getOrganizations = async (req, res) => {
    let filters = req.query;

    let organizations = await orgModel.find(filters);
    return res.status(200).json({ data: organizations });
};

exports.updateOrganization = async (req, res) => {
    let id = req.params.organizationId;
    let data = req.body;
    let { name, email, phone, cropSeason } = data;
console.log(data);
    if (!isValidObjectId(id)) {
        return sendError(res, "Invalid organization Id");
    }

    let organization = await orgModel.findById(id);
    if (!organization) {
        return sendError(res, "No organization found", 404);
    }

    if (name) {
        let organization = await orgModel.findOne({ name });
        if (organization) {
            return sendError(
                res,
                "The organization you are trying to add is already exists"
            );
        }
    }
    if (email) {
        let emailExists = await orgModel.findOne({ email });
        if (emailExists) {
            return sendError(res, "Email already exists");
        }
    }
    if (phone) {
        let phoneExists = await orgModel.findOne({ phone });
        if (phoneExists) {
            return sendError(res, "Phone already exists");
        }
    }

    if (cropSeason) {
        data.cropSeason = cropSeason.split(",").map((x) => x.trim());
        let seasonCheck = data.cropSeason.every((x) =>
            seasons.some((y) => x === y)
        );
        if (!seasonCheck) {
            return sendError(
                res,
                "Crop seasons have only Kharif, Rabi and Zaid only"
            );
        }
    }

    let update = await orgModel.findOneAndUpdate(
        { _id: id },
        { $set: { ...data } },
        { new: true }
    );
    return res.status(200).json({ msg: "Updated Successfully", data: update });
};
