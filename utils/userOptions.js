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
                db.query(`SELECT * FROM department`, (err, data) => {
                    if (err) throw err;
                    console.table(data);
                    getUserSelection(db);
                });
                //
            } else if (answers.option == "view all roles") {
                db.query(
                    `
                    SELECT role.id, role.title, department.name as department, role.salary 
                    FROM role 
                    LEFT JOIN department 
                    ON role.department_id=department.id`,
                    (err, data) => {
                        if (err) throw err;
                        console.table(data);
                        getUserSelection(db);
                    }
                );
            } else if (answers.option == "view all employees") {
                db.query(
                    `
                    SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name as department, role.salary, employee.manager_id as manager
                    FROM employee 
                    JOIN role 
                    ON role.id=employee.role_id 
                    JOIN department 
                    ON department.id=role.department_id `,
                    (err, data) => {
                        if (err) throw err;
                        console.table(data);
                        getUserSelection(db);
                    }
                );
                //
            } else {
                process.exit(0);
            }
        })
        .catch((err) => {
            console.log(err);
        });
}

module.exports = { getUserSelection };
