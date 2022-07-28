const express = require('express');
const mysql = require("mysql2");
require("dotenv").config();

const PORT = process.env.PORT || 3001;

const app = express();

// Express Middleware
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// DB Connection
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: 'employees_db'
    },
    console.log('Connected to the employees_db database')
);