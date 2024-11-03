const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Salary = new Schema({
    timekeeper: { type: Array, required: true },
    totalEarnings: { type: Number, require: true },
    monthlyEarnings: { type: Number, require: true },
    user: {
        type: Schema.Types.ObjectId,
        ref: "Users",
    },
});

module.exports = mongoose.model("Salary", Salary);
