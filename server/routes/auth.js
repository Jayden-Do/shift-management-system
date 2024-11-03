const express = require("express");
const router = express.Router();
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const verifyToken = require("../middleware/auth");

const User = require("../models/User");

// @route GET api/auth/
// @desc check if user is authenticated
// @access public
router.get("/", verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.userId).select("-password");
        if (!user) return res.status(400).json({ success: false, message: "User not found" });
        res.json({ success: true, user: user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

// @route POST api/auth/register
// @desc Register user
// @access public
router.post("/register", async (req, res) => {
    const { username, password, userType } = req.body;

    // Simple validation
    if (!username || !password) {
        return res
            .status(400)
            .json({ success: false, message: "Missing username and/or password" });
    }
    try {
        // Check for existing user
        const user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        // All good
        const hashedPassword = await argon2.hash(password);
        const newUser = new User({
            username,
            password: hashedPassword,
            userType: userType || "Staff",
        });
        await newUser.save();

        // Return token
        const accessToken = jwt.sign({ userId: newUser._id }, process.env.ACCESS_TOKEN_SECRET);

        res.json({
            success: true,
            message: "User saved successfully",
            accessToken: accessToken,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

// @route POST api/auth/login
// @desc Login user
// @access public
router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    // Simple validation
    if (!username || !password) {
        return res
            .status(400)
            .json({ success: false, message: "Missing username and/or password" });
    }

    try {
        // Check for existing user
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Incorrect username or password! Please try again ^^",
            });
        }

        // Username found
        const passwordValid = await argon2.verify(user.password, password);

        if (!passwordValid) {
            return res.status(400).json({
                success: false,
                message: "Incorrect username or password! Please try again ^^",
            });
        }

        // All good
        // Return token
        const accessToken = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET);

        res.json({
            success: true,
            message: "User logged in successfully",
            accessToken: accessToken,
            user: { userId: user._id, username: user.username, userType: user.userType },
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

// @route PUT api/auth/change-password
// @desc Change user password
// @access private
router.put("/change-password", verifyToken, async (req, res) => {
    const { oldPassword, newPassword, confirmNewPassword } = req.body;

    // Simple validation
    if (!oldPassword || !newPassword || !confirmNewPassword) {
        return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    try {
        // Get user from the database
        const user = await User.findById(req.userId);

        if (!user) {
            return res.status(400).json({ success: false, message: "User not found" });
        }

        // Verify old password
        const isOldPasswordValid = await argon2.verify(user.password, oldPassword);

        if (!isOldPasswordValid) {
            return res.status(400).json({ success: false, message: "Invalid old password" });
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

        // Return token
        const accessToken = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET);

        res.json({
            success: true,
            message: "Password changed successfully",
            accessToken: accessToken,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

module.exports = router;
