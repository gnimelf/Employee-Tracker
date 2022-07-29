const mysql = require("mysql2");
const inquirer = require("inquirer");
require("dotenv").config();

const cTable = require("console.table");

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

const userOptions = [
  {
    type: "list",
    name: "option",
    message: "Please choose an option: ",
    choices: [
      "view all departments",
      "view all roles",
      "view all employees",
      "add a department",
      "add an employee",
      "update an employee role",
      "quit",
    ],
  },
];

function init() {
  // Get user questions
  inquirer
    .prompt(userOptions)

    .then((answers) => {

      // user answer to make db calls
      if (answers.option == "view all departments") {
        db.query(`SELECT name FROM department`, (err, data) => {
          if (err) throw err;
          console.table(data);
          init();
        });
    // 
      } else if (answers.option == "view all roles") {
        db.query(`SELECT * FROM role`, (err, data) => {
          if (err) throw err;
            console.table(data);
            init();
        });
    
      } else if (answers.option == "view all employees") {
        db.query(`SELECT * FROM employee`, (err, data) => {
          if (err) throw err;
            console.table(data);
            init();
        });
    // 
      }else {
        process.exit(0);
      }
    })
    .catch((err) => {
      console.log(err);
    });
}
// Star program
init();
