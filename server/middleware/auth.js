const jwt = require("jsonwebtoken");
const User = require("../models/User");

const verifyToken = async (req, res, next) => {
    const authHeader = req.header("Authorization"); // Bearer <token>
    const token = authHeader && authHeader.split(" ")[1]; // Take token

    if (!token) {
        return res.status(401).json({ success: false, message: "Access token not found" });
    }

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        // Attach user information to the request
        const user = await User.findById(decoded.userId);
        if (!user) {
            return res
                .status(401)
                .json({ success: false, message: "Access denied. Invalid token." });
        }

        req.userId = decoded.userId;
        req.userType = user.userType;
        next();
    } catch (error) {
        console.log(error);
        return res.status(403).json({ success: false, message: "Invalid token" });
    }
};

module.exports = verifyToken;
