const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");

const Info = require("../models/Info");

// @route GET api/user/info
// @desc Get info
// @access private
router.get("/info", verifyToken, async (req, res) => {
    try {
        const infos = await Info.find({ user: req.userId }).populate("user", ["username"]);
        res.json({ success: true, info: infos });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

// @route POST api/user/info
// @desc Create info
// @access private
router.post("/info", verifyToken, async (req, res) => {
    const { firstName, lastName, email, gender, birth, address } = req.body;

    // Simple validation
    if (!firstName || !lastName || !email || !birth) {
        return res.status(400).json({ success: false, message: "please fill all information" });
    }

    try {
        const newInfo = new Info({
            firstName,
            lastName,
            role: "Staff",
            email,
            gender: gender || "SECRET",
            birth,
            address: address || "UNKNOWN",
            user: req.userId,
        });

        await newInfo.save();

        res.json({ success: true, message: "Information updated!", info: newInfo });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

// @route PUT api/user/info
// @desc Update info
// @access private
router.put("/info/:id", verifyToken, async (req, res) => {
    const { firstName, lastName, email, gender, birth, address } = req.body;

    // Simple validation
    if (!firstName || !lastName || !email || !birth) {
        return res.status(400).json({ success: false, message: "please fill all information" });
    }

    try {
        let updatedInfo = {
            firstName,
            lastName,
            email,
            gender: gender || "SECRET",
            birth,
            address: address || "UNKNOWN",
        };

        const infoUpdateCondition = { _id: req.params.id };
        updatedInfo = await Info.findOneAndUpdate(infoUpdateCondition, updatedInfo, {
            new: true,
        });

        // User not authorized to update post or post not found
        if (!updatedInfo) {
            return res.status(401).json({
                success: false,
                message: "Post not found or user not authorized to update post",
                test: infoUpdateCondition,
            });
        }

        res.json({ success: true, message: "Information updated!", info: updatedInfo });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

module.exports = router;
