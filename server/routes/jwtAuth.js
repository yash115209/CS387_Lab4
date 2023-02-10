const router = require("express").Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const validInfo = require("../middleware/validInfo");
const authorize = require("../middleware/authorize");
//registering

router.post("/register", validInfo, async(req, res) => {
    try{ 
        //1. destructure the req.body
        const {id, password} = req.body;
        //2. check if user exists
        const user = await pool.query("SELECT * FROM user_password WHERE ID = $1", [
            id
        ]);
        if(user.rows.length != 0){
            return res.status(401).json("User already exists"); 
        }

        //3. becrypt the user password

        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);
        const bcryptPassword = await bcrypt.hash(password, salt);
        //4. enter the new user inside our database
        
        const newUser = await pool.query("INSERT INTO user_password (ID, hashed_password) VALUES ($1, $2) RETURNING *", [id, bcryptPassword]);
        //res.json(newUser.rows[0]);

        //5. generate the jwt token
        const token = jwtGenerator(newUser.rows[0].id);

        return res.json({ token });
    } catch(err){
        console.error(err.message);
        res.status(500).send("Server Error");
    }
})

router.post("/login", validInfo, async(req, res) => {
    try{
        //1. destructure the req.body
        const {id, password} = req.body;
        console.log(id, password, "hi");
        //2. check if user exists
        const user = await pool.query("SELECT * FROM user_password WHERE ID = $1", [
            id
        ]);
        if(user.rows.length === 0){
            return res.status(401).json("ID or password is incorrect"); 
        }
        //3. check if incoming password matches our password
        const validPassword = await bcrypt.compare(
            password,
            user.rows[0].hashed_password
          );
        if (!validPassword) {
            return res.status(401).json("Invalid Credential");
        }
        //4. give the jwt token
        const jwtToken = jwtGenerator(user.rows[0].id);
        return res.json({ jwtToken });
    } catch(err){
        console.error(err.message);
        res.status(500).send("Server Error");
    }
})

router.get("/verify", authorize, (req, res) => {
    try {
      res.json(true);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  });

module.exports = router;