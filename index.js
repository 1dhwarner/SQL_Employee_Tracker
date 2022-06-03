const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');
require('console.table');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// connect to sql database. I ended up using MySQL Work bench to seed the data found in the db folder 
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '1!TurtlesAreEvil',
        database: 'employees_db',
    },
    console.log('Connected to the employees_db.')
);

// everything starts and runs through the main menu 
function mainMenu() {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'selection',
                message: 'What would you like to do?',
                choices: [
                    {
                        name: "View All Employees",
                        value: "GET_EMPLOYEES"

                    },
                    {
                        name: "Add Employee",
                        value: "CREATE_EMPLOYEE"
                    },
                    {
                        name: "Update Employee Role",
                        value: "UPDATE_ROLES"
                    },
                    {
                        name: "View All Roles",
                        value: "GET_ROLES"
                    },
                    {
                        name: "Add Role",
                        value: "CREATE_ROLE"
                    },
                    {
                        name: "View All Departments",
                        value: "GET_DEPARTMENTS"
                    },
                    {
                        name: "Add Department",
                        value: "ADD_DEPARTMENT"
                    },
                    {
                        name: "Exit",
                        value: "EXIT"
                    }
                ]

            },
        ])
        .then((selection) => {
            console.log('selection: ', selection);
            switch (selection.selection) {
                case "GET_EMPLOYEES":
                    getEmployees();
                    break;
                case "CREATE_EMPLOYEE":
                    createEmployee();
                    break
                case "UPDATE_ROLES":
                    updateRole();
                    break;
                case "GET_ROLES":
                    getRoles();
                    break
                case "CREATE_ROLE":
                    createRole();
                    break;
                case "GET_DEPARTMENTS":
                    getDepartments();
                    break;
                case "ADD_DEPARTMENT":
                    addDepartment();
                    break;
                case "EXIT":
                    exit();
                    break;
            }

        });
}

// each get function is essentially the same js code with different sql queries 
function getEmployees() {
    const sql = `SELECT employee.id AS id, employee.first_name AS first_name, employee.last_name AS last_name, employee.roles_id AS roles_id, employee.manager_id AS manager_id FROM employee`;

    db.query(sql, (err, response) => {
        if (err) {
            console.log(err.message);
        }
        console.table('response: ', response);

    });

    mainMenu();
}

// each post function is essentially the same js code with different sql queries 
function createEmployee() {
    inquirer.prompt([
        {
            type: "question",
            name: "role",
            message: "What role within in the business? Please enter ID."
        },
        {
            type: "question",
            name: "manager",
            message: "If they have a manager, who is it? Please enter ID."
        },
        {
            type: "question",
            name: "first",
            message: "First name?"
        },
        {
            type: "question",
            name: "last",
            message: "Last name?"
        }
    ]).then(function (answer) {
        const sql = `INSERT INTO employee (first_name, last_name, roles_id, manager_id) VALUES (?, ?, ?, ?)`;
        const params = [answer.first, answer.last, answer.roles, answer.manager]
        db.query(sql, params, (err) => {
            if (err) {
                console.log(err.message);
            }
            console.log("Employee added");
            getEmployees();

        });
    });
}

function updateRole() {
    inquirer.prompt([
        {
            name: 'selectEmployeeId',
            type: 'input',
            message: 'Enter the ID of the employee that you want to reassign roles to'
        },
        {
            name: 'newRole',
            type: 'input',
            message: 'Assign them a new Role ID'
        }
    ]).then(function (answer) {
        console.log('yo yo yo');
        const sql = `UPDATE employee SET employee.roles_id = ? WHERE employee.id = ?`
        let params = [answer.newRole, answer.selectEmployeeId]
        db.query(sql, params, (err) => {
            if (err) {
                console.log(err.message);
            }
            console.log("Employee updated");
            getEmployees();
        });
    });
}

function getRoles() {
    const sql = `SELECT roles.id AS id, roles.title AS title, roles.salary AS salary, roles.department_id AS department_id FROM roles`;

    db.query(sql, (err, response) => {
        if (err) {
            console.log(err.message);
        }
        console.table('response: ', response);

    });
    mainMenu();
}

function createRole() {
    inquirer.prompt([
        {
            type: "input",
            message: "please enter the role's title",
            name: "title"
        },
        {
            type: "input",
            message: "please enter the role's salary",
            name: "salary"
        },
        {
            type: "input",
            message: "please enter the department ID that the role belongs to",
            name: "department"
        }
    ]).then(function (answer) {
        const sql = `INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`;
        const params = [answer.title, answer.salary, answer.department]
        db.query(sql, params, (err) => {
            if (err) {
                console.log(err.message);
            }
            console.log("Role added");
            getRoles();
        });
    });
}

function getDepartments() {
    const sql = `SELECT department.id AS id, department.department_name AS department FROM department`;

    db.query(sql, (err, response) => {
        if (err) {
            console.log(err.message);
        }
        console.table('response: ', response);

    });
    mainMenu();
}

function addDepartment() {
    inquirer.prompt([
        {
            type: "input",
            message: "please enter the department's title",
            name: "departmentName"
        }
    ]).then(function (answer) {
        const sql = `INSERT INTO department (department_name) VALUES (?)`;
        const params = [answer.departmentName]
        db.query(sql, params, (err) => {
            if (err) {
                console.log(err.message);
            }
            console.log("Department added");
            getDepartments();
        });
    });
}

// using NodeJS 'process' 
function exit() {
    process.exit();
}

// all other functions called within the mainMenu() function 
mainMenu();
