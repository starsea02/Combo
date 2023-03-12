const Pool = require('pg').Pool;

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "combodb",
    password: "cisco",
    port: 5432,
});

module.exports = pool;