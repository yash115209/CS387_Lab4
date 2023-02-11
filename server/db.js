require('dotenv').config();
const Pool = require("pg").Pool;
require("dotenv").config();


const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
});

module.exports = pool;