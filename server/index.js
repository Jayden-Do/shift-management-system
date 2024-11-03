require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const authRouter = require("./routes/auth");
const userInfoRouter = require("./routes/info");
const salaryRouter = require("./routes/salary");
const adminRouter = require("./routes/admin");
const userShiftRouter = require("./routes/shiftUser");
const cors = require("cors");

const connectDB = async () => {
    try {
        await mongoose.connect(
            `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@database.n3y93ea.mongodb.net/?retryWrites=true&w=majority`,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        );
        console.log("MongoDB connected");
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
};

connectDB();

const app = express();
app.use(express.json());

app.use(cors());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const allowCrossDomain = function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
    res.header(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization, Content-Length, X-Requested-With"
    );

    // intercept OPTIONS method
    if ("OPTIONS" == req.method) {
        res.send(200);
    } else {
        next();
    }
};

app.use(allowCrossDomain);

// Sử dụng các router
app.use("/api/auth", authRouter);
app.use("/api/user", userInfoRouter, userShiftRouter, salaryRouter);
app.use("/api/admin", adminRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
