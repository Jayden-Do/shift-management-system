const mongoose = require("mongoose");
const { Schema } = mongoose;

const TimeTableSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "Users" },
    week: Number,
    dateStart: Date,
    dateEnd: Date,
    registered_shifts: [{ type: Schema.Types.ObjectId, ref: "ShiftRegister" }],
    assigned_shifts: [{ type: Schema.Types.ObjectId, ref: "ShiftAssign" }],
});

const ShiftRegisterSchema = new Schema({
    time_table: { type: Schema.Types.ObjectId, ref: "TimeTable" },
    shiftName: Number,
});

const ShiftAssignSchema = new Schema({
    time_table: { type: Schema.Types.ObjectId, ref: "TimeTable" },
    shiftName: Number,
});

const TimeTable = mongoose.model("TimeTable", TimeTableSchema);
const ShiftRegister = mongoose.model("ShiftRegister", ShiftRegisterSchema);
const ShiftAssign = mongoose.model("ShiftAssign", ShiftAssignSchema);

module.exports = { TimeTable, ShiftRegister, ShiftAssign };
