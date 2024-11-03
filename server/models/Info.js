const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const InfoSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["Manager", "Staff"],
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
    },
    birth: {
        type: String,
        required: true,
    },
    address: {
        type: String,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "Users",
    },
    createDate: {
        type: Date,
        default: Date.now(),
    },
});

module.exports = mongoose.model("Infos", InfoSchema);
