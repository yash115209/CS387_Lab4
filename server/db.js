const Pool = require("pg").Pool;

const pool = new Pool({
    user: "aviuday",
    password: "1234",
    host: "localhost",
    port: 5432,
    database: "lab4"
});

module.exports = pool;