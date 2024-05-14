const mysql = require("mysql2/promise");
require("dotenv").config();

// DB Connection
async function connection() {
    return await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    });
}

module.exports = connection;
