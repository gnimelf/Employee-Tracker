const mysql = require("mysql2");
const inquirer = require("inquirer");
require("dotenv").config();
const cTable = require("console.table");

// Menu Options
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

// Get user questions
function getUserSelection(db) {
    inquirer
        .prompt(userOptions)

        .then((answers) => {
            // user answer to make db calls
            if (answers.option == "view all departments") {
                db.query(`SELECT name FROM department`, (err, data) => {
                    if (err) throw err;
                    console.table(data);
                    getUserSelection(db);
                });
                //
            } else if (answers.option == "view all roles") {
                db.query(`SELECT * FROM role`, (err, data) => {
                    if (err) throw err;
                    console.table(data);
                    getUserSelection(db);
                });
            } else if (answers.option == "view all employees") {
                db.query(`SELECT * FROM employee`, (err, data) => {
                    if (err) throw err;
                    console.table(data);
                    getUserSelection(db);
                });
                //
            } else {
                process.exit(0);
            }
        })
        .catch((err) => {
            console.log(err);
        });
}

module.exports = {getUserSelection}