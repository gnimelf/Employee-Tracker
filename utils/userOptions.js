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
            "View All Employees",
            "Add Employee",
            "Update Employee Role",
            "View All Roles",
            "Add Role",
            "View All Departments",
            "Add Department",
            "Quit",
        ],
    },
];

let newDBData;

// Add a Department to the db
function addDepartment() {
    inquirer
        .prompt({
            type: "input",
            message: "What is the name of the department? ",
            name: "newDepartment",
        })
        .then((answer) => {
            // console.log(`Your entered ${answer.newDepartment}`);
            newDBData.query(
                `INSERT INTO department (name)
                VALUES ("${answer.newDepartment}")`,
                (err, data) => {
                    if (err) throw err;
                    console.table(data);
                    getUserSelection(newDBData);
                }
            );
        })
        .catch((err) => {
            if (err) throw err;
        });
}

// Display all Roles
function viewRoles(){
    return newDBData.query(
        `
        SELECT role.id, 
        role.title, 
        department.name as department, 
        role.salary 
        FROM role 
        LEFT JOIN department 
        ON role.department_id=department.id`,
        (err, data) => {
            if (err) throw err;
            console.table(data);
            getUserSelection(newDBData);
        }
    );

}

// Get user questions from db
function getUserSelection(db) {
    newDBData = db;
    inquirer
        .prompt(userOptions)
        .then((answers) => {
            // user answer to make db calls
            if (answers.option == "View All Employees") {
                db.query(
                    `
                    SELECT 
                    employee.id, 
                    employee.first_name, 
                    employee.last_name, 
                    role.title,role.salary, 
                    department.name as department, 
                    CONCAT(mgr.first_name, " ", mgr.last_name) as manager
                    FROM employee 
                    LEFT JOIN role ON role.id = employee.role_id 
                    LEFT JOIN department ON department.id = role.department_id 
                    LEFT JOIN employee as mgr ON employee.id = mgr.manager_id`,
                    (err, data) => {
                        if (err) throw err;
                        console.table(data);
                        getUserSelection(newDBData);
                    }
                );
            } else if (answers.option == "Add employee") {
                console.log("will add employee");
            } else if (answers.option == "Update Employee Role") {
                console.log("will update employee");
            } else if (answers.option == "View All Roles") {
                
            } else if (answers.option == "Add Role") {
                console.log("will add role");
            } else if (answers.option == "View All Departments") {
                db.query(
                    `SELECT * FROM department
                ORDER BY department.name`,
                    (err, data) => {
                        if (err) throw err;
                        console.table(data);
                        getUserSelection(newDBData);
                    }
                );
            } else if (answers.option == "Add Department") {
                addDepartment(newDBData);
            } else {
                process.exit(0);
            }
        })
        .catch((err) => {
            console.log(err);
        });
}

function addEmployee() {}

module.exports = { getUserSelection };
