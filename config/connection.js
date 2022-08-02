const mysql = require("mysql2");

// DB Connection
const db = mysql.createConnection(
    {
        host: "localhost",
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: "employees_db",
    }
    // console.log('Connected to the employees_db database')
);

module.exports=db;