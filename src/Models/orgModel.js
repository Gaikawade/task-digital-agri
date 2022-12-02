const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const orgSchema = mongoose.Schema(
    {
        adminId: {
            type: ObjectId,
            required: true,
            ref: "Admin",
        },
        name: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        phone: {
            type: Number,
            required: true,
            unique: true,
        },
        headQuarters: {
            type: String,
            required: true,
        },
        address: {
            street: {
                type: String,
                required: true,
            },
            landmark: {
                type: String,
                required: true,
            },
            pincode: {
                type: Number,
                required: true,
            },
        },
        cropSeason: {
            type: [String],
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Organization", orgSchema);
