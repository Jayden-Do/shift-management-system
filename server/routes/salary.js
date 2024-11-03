const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");
const Salary = require("../models/Salary");
const User = require("../models/User");

// @route GET api/salary/user/
// @desc Get salary information by user ID or create new if not found
// @access private (requires authentication)
router.get("/salary", verifyToken, async (req, res) => {
    try {
        // Check if the user already has a salary record
        let salary = await Salary.findOne({ user: req.userId }).populate("user", [
            "username",
            "userType",
        ]);

        // If no salary record found, create a new one
        if (!salary) {
            // Create a new salary record
            const newSalary = new Salary({
                timekeeper: [], // You can add initial timekeeper data if needed
                totalEarnings: 0, // Set initial total earnings
                monthlyEarnings: 0, // Set initial monthly earnings
                user: req.userId,
            });

            // Save the new salary record
            salary = await newSalary.save();
        }

        res.json({ success: true, salary: salary });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

module.exports = router;
