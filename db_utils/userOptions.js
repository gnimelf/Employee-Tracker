const connectToDB = require("../config/connection");
const inquirer = require("inquirer");
const cTable = require("console.table");

// 
let db;

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


// Add a Department to the db   // DONE
async function addDepartment() {

    let deptData;

    try {
        [deptData] = await db.query(`SELECT name FROM department`);
    } catch (err) {
        console.log(err);
    }
    const { newDepartment } = await inquirer.prompt({
        type: "input",
        message: "What is the name of the department? ",
        name: "newDepartment",
    });

    const found = deptData.some(({ name }) => {
        return name == newDepartment;
    });

    if (!found) {
        try {
          const result = await db.query(
            `INSERT INTO department (name)
                VALUES ("${newDepartment}")`);  
        } catch (err) {
            console.log(err);
        }
            getUserSelection();
    } else {
        console.log("This department already exists!")
    }
}

// Display all departments in the db  // DONE
async function viewAllDepartments() {
   const [data] = await db.query(`SELECT * FROM department ORDER BY department.name`);
    console.table(data);
    getUserSelection();

}


// ADD EMPLOYEE
async function addEmployee() {


}

// Display all Roles in db
function viewRoles() {
    newDBData.query(
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
            getUserSelection();
        }
    );
}

// Display all Employee in db
function viewAllEmployees() {
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
            getUserSelection();
        }
    );
}

function updateEmployeeRole() {}

// Get user questions from db
async function getUserSelection() {

    // connect to database
    db = await connectToDB();

    inquirer
        .prompt(userOptions)
        .then((answers) => {
            // user answer to make db calls
            if (answers.option == "View All Employees") {
                viewAllEmployees();
            } else if (answers.option == "Add Employee") {
                addEmployee();
            } else if (answers.option == "Update Employee Role") {
                console.log("will update employee");
            } else if (answers.option == "View All Roles") {
                viewRoles();
            } else if (answers.option == "Add Role") {
                console.log("will add role");
            } else if (answers.option == "View All Departments") {
                viewAllDepartments();
            } else if (answers.option == "Add Department") {
                addDepartment();
            } else {
                process.exit(0);
            }
        })
        .catch((err) => {
            console.log(err);
        });
}

module.exports = { getUserSelection };
