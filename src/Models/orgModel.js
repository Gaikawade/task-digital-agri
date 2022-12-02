const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId

const orgSchema = mongoose.Schema(
    {
        adminId: {
          type: ObjectId,
          required: true,
          ref: "Admin"
        },
        name: {
            type: String,
            required: true,
            unique: true
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
        headQuarters: {
            type: String,
            required: true,
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
    },
    { timestamps: true }
);

module.exports = mongoose.model("Organization", orgSchema);