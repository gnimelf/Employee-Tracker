const mysql = require("mysql2/promise");
require("dotenv").config();

// DB Connection
async function connection() {
    return await mysql.createConnection({
        host: "localhost",
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: "employees_db",
    });
}

module.exports = connection;
