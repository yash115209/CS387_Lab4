const express = require("express");
const session = require('express-session');
const cookieParser = require("cookie-parser");
const cors = require("cors");
const pool = require("./db");
require('dotenv').config();
const app = express();

//sessions procedure
app.use(cookieParser());
app.use(express.json());

const pgSession = (require('connect-pg-simple')(session));

app.use(
    session({
        store: new pgSession({
            pool:pool,
            tableName: "session"
        }),
        secret: process.env.SESSION_SECRET,
        saveUninitialized: true,
        resave: false,
        cookie: {
            secure: false,
            httpOnly: false,
            sameSite: false,
            maxAge: 1000 * 60 * 60 * 24,
        },
    })
)
//middleware

app.use(cors());
app.use(express.json());

//ROUTES

app.use("/home", require("./routes/dashboard"));
app.use("/course", require("./routes/course"));
app.use("/instructor", require("./routes/instructor"));
app.use("/auth", require("./routes/jwtAuth"));

app.listen(6000, () => {
    console.log("server is running on port 6000");
})