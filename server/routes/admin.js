const express = require("express");
const router = express.Router();
const argon2 = require("argon2");
const verifyToken = require("../middleware/auth");

const Info = require("../models/Info");
const User = require("../models/User");
const Salary = require("../models/Salary");
const { TimeTable, ShiftRegister, ShiftAssign } = require("../models/Shift");

const geneticAlgorithm = require("../algorithm/genetic");

// ACCOUNT
// Get all users
router.get("/users", verifyToken, async (req, res) => {
    try {
        const users = await Info.find().sort({ firstName: 1 });
        res.json({ success: true, users: users });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

// SALARY
// Get all users salary
router.get("/users/salary", verifyToken, async (req, res) => {
    try {
        const salaries = await Salary.find().populate([
            {
                path: "user",
                select: "username",
            },
        ]);
        res.json({ success: true, checkouts: salaries });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

// @route PUT api/salary/update
// @desc Update salary data for a user
// @access private (requires authentication, admin, or manager role)
router.put("/salary/update", verifyToken, async (req, res) => {
    try {
        // Check if the user has permission
        if (req.userType !== "Manager") {
            return res.status(403).json({ success: false, message: "Permission denied" });
        }

        // Destructure the request body
        const { checkouts } = req.body;

        // Loop through each checkout object
        for (const checkout of checkouts) {
            const { userId, checkoutShifts } = checkout;

            // Calculate total earnings and monthly earnings
            const totalEarnings = checkoutShifts.length * 100000;
            const monthlyEarnings = totalEarnings; // Assuming monthly earnings are same as total earnings

            // Find the salary document for the user
            let salary = await Salary.findOne({ user: userId });

            // If salary document doesn't exist, create a new one
            if (!salary) {
                salary = new Salary({
                    timekeeper: checkoutShifts,
                    totalEarnings,
                    monthlyEarnings,
                    user: userId,
                });
            } else {
                // If salary document exists, update it
                salary.timekeeper.push(...checkoutShifts);
                salary.totalEarnings += totalEarnings;
                salary.monthlyEarnings += monthlyEarnings;
            }

            // Save the updated salary document
            await salary.save();
        }

        res.json({ success: true, message: "Salary updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

module.exports = router;

// INFORMATION
// Get User's info
router.get("/user/:id", verifyToken, async (req, res) => {
    try {
        const user = await Info.find({ user: { $eq: req.params.id } });
        res.json({ success: true, user: user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

// @route GET api/admin/get-user-info/:username
// @desc Get user information by admin
// @access private (admin)
router.get("/user-account/:username", verifyToken, async (req, res) => {
    // Check if the requesting user is an admin
    if (req.userType !== "Manager") {
        return res.status(403).json({ success: false, message: "Permission denied" });
    }

    const { username } = req.params;

    try {
        // Find user by username
        const user = await User.findOne({ username }).select("-password");

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.json({ success: true, user: user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

// SHIFT
// delete shift
router.put("/shift/:id", async (req, res) => {
    const { shiftTime } = req.body;

    if (!shiftTime) {
        return res.status(404).json({ success: false, message: "No Shift Time" });
    }

    const shiftTest = await ShiftAdmin.findOne({ _id: req.params.id }).populate("user", "username");
    for (let i = 0; i < shiftTest.shifts.length; i++) {
        if (shiftTest.shifts[i].shiftTime === shiftTime) {
            let spliced = shiftTest.shifts.splice(i, 1);
        }
    }
    console.log(shiftTest.shifts, shiftTime);
    try {
        let updatedShift = { shiftQuantity: shiftTest.shifts.length, shifts: shiftTest.shifts };
        const shiftUpdateCondition = { _id: req.params.id };
        updatedShift = await ShiftAdmin.findOneAndUpdate(shiftUpdateCondition, updatedShift, {
            new: true,
        }).populate("user", "username userType");

        if (!updatedShift) {
            return res.status(401).json({
                success: false,
                message: "Shift not found",
                test: shiftUpdateCondition,
            });
        }
        res.json({ success: true, message: "Admin Shift updated!", shift: updatedShift });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

// PASSWORD

// @route PUT api/admin/change-user-password/:userId
// @desc Change user password by admin
// @access private (admin)
router.put("/change-user-password/:userId", verifyToken, async (req, res) => {
    // Check if the requesting user is an admin
    if (req.userType !== "Manager") {
        return res.status(403).json({ success: false, message: "Permission denied" });
    }

    const { userId } = req.params;
    const { newPassword, confirmNewPassword } = req.body;

    // Simple validation
    if (!newPassword || !confirmNewPassword) {
        return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    try {
        // Get user from the database
        const user = await User.findById(userId);

        if (!user) {
            return res.status(400).json({ success: false, message: "User not found" });
        }

        // Check if new password and confirm new password match
        if (newPassword !== confirmNewPassword) {
            return res.status(400).json({ success: false, message: "New passwords do not match" });
        }

        // Hash the new password
        const hashedNewPassword = await argon2.hash(newPassword);

        // Update user's password
        user.password = hashedNewPassword;
        await user.save();

        res.json({
            success: true,
            message: "User password changed successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

// =================================================================

// Get all Timetables
router.get("/tables", verifyToken, async (req, res) => {
    try {
        const timeTables = await TimeTable.find().populate([
            {
                path: "user",
                select: "-password",
            },
            {
                path: "registered_shifts",
                model: "ShiftRegister",
                select: "shiftName",
            },
            {
                path: "assigned_shifts",
                model: "ShiftAssign",
                select: "shiftName",
            },
        ]);
        res.json({
            success: true,
            message: "Get all staff's tables successfully!",
            time_tables: timeTables,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

// Endpoint để generate_assign_shifts
router.get("/generate_assign_shifts", verifyToken, async (req, res) => {
    if (req.userType !== "Manager")
        return res.status(403).json({ success: false, message: "Permission Denied" });
    try {
        const timeTables = await TimeTable.find({}).populate([
            {
                path: "registered_shifts",
                select: "shiftName",
            },
        ]);
        const assignedTable = geneticAlgorithm(timeTables);

        // Lấy danh sách users
        const users = await User.find({});

        assignedTable.forEach((item) => {
            users.forEach((user) => {
                if (item.user_id === user.id) item["username"] = user.username;
            });
        });

        // Trả về kết quả
        res.status(200).json({
            success: true,
            message: "Assigned shifts successfully!",
            assignedTable: assignedTable,
        });
    } catch (error) {
        console.error("Error generating assigned shifts:", error);
        res.status(500).json({
            success: false,
            message: "Error generating assigned shifts",
        });
    }
});

router.post("/confirm_assign_shifts", verifyToken, async (req, res) => {
    if (req.userType !== "Manager")
        return res.status(403).json({ success: false, message: "Permission Denied" });
    try {
        const assignedTable = req.body.assignedTable;

        for (const assignData of assignedTable) {
            const userId = assignData.user_id;
            const shifts = assignData.shifts;
            try {
                // Tìm bảng thời gian cho userId
                const timetable = await TimeTable.findOne({ user: userId });

                // Kiểm tra nếu không tìm thấy bảng thời gian cho userId
                if (!timetable) {
                    console.error(`Error: TimeTable not found for user ${userId}`);
                    continue; // Tiếp tục với phần tử tiếp theo trong assignedTable
                }

                // Tạo danh sách các shift assign
                const shiftAssignments = [];

                // Lấy thông tin về shiftName từ mảng shifts
                for (const shift of shifts) {
                    // Thêm thông tin shiftName vào danh sách shiftAssignments
                    shiftAssignments.push({
                        time_table: timetable._id, // Thêm id của bảng thời gian
                        shiftName: shift.shiftName, // Lấy shiftName từ body của yêu cầu
                    });
                }

                // Ghi thông tin vào collection ShiftAssign
                const shiftAssigns = await ShiftAssign.insertMany(shiftAssignments);

                timetable.assigned_shifts = shiftAssigns;

                await timetable.save();
            } catch (error) {
                console.error(`Error assigning shifts for user ${userId}:`, error);
            }
        }

        res.status(200).json({
            success: true,
            message: "Assigned shifts confirmed and saved successfully!",
        });
    } catch (error) {
        console.error("Error confirming assigned shifts:", error);
        res.status(500).json({
            success: false,
            message: "Error confirming assigned shifts",
        });
    }
});

router.delete("/delete_assignments", verifyToken, async (req, res) => {
    if (req.userType !== "Manager")
        return res.status(403).json({ success: false, message: "Permission Denied" });

    try {
        const timeTables = await TimeTable.find({});

        // Duyệt qua từng object trong danh sách timeTables
        for (const timetable of timeTables) {
            // Gán mảng assigned_shifts bằng một mảng trống
            timetable.assigned_shifts = [];

            // Lưu lại thông tin sau khi đã làm rỗng mảng assigned_shifts
            await timetable.save();
        }

        res.status(200).json({ success: true, message: "Assigned shifts deleted successfully!" });
    } catch (error) {
        console.error("Error deleting assigned shifts:", error);
        res.status(500).json({ success: false, message: "Error deleting assigned shifts" });
    }
});

module.exports = router;
