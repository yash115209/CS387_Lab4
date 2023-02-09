const Pool = require("pg").Pool;

const pool = new Pool({
    user: "yashsingh",
    password: "postgres",
    host: "localhost",
    port: 5432,
    database: "jwtlab4"
});

module.exports = pool;