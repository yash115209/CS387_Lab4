const express = require("express");
const app = express();
const cors = require("cors");

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