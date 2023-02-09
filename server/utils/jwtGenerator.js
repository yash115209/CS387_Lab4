const jwt = require("jsonwebtoken");
require("dotenv").config();
//we can add instructor/student in payload
function jwtGenerator(user_id){
    //we can search over here whether the person is an instructor or a student and add 
    //it to payload
    const payload = {
        user: user_id
    }
    return jwt.sign(payload, process.env.jwtSecret, {expiresIn: "1hr"})
}

module.exports = jwtGenerator;