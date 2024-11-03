const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    userType: {
        type: String,
        enum: ["Manager", "Staff"],
        required: true,
    },
    createAt: {
        type: Date,
        default: Date.now(),
    },
});

module.exports = mongoose.model("Users", UserSchema);
