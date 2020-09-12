'use strict';

// Dependencies
const inquirer = require('inquirer');
const logo = require('asciiart-logo');
const prompts = require('./prompts');
const db = require('./db');
const connection = require('./db/connection');
require('console.table');


// Init function with asciiart-logo and mainPrompt() call
init();

function init() {
  const logoText = logo({ name: 'Employee Tracker' }).render();
  console.log(logoText);
  console.log('  WELCOME!');
  console.log('\n');
  mainPrompt();
}

// --------------------------------------------------------------
// Method 1: Async function mainPrompt() / bringing inquirer and
// destructuring its response, using { choice } as the variable to
// pull out choice from the promise object returned, so no need to
// use choice.choice before switch case / See prompts.js / CRUD:

async function mainPrompt() {
    const { choice } = await inquirer.prompt(prompts.mainPrompt);

    switch (choice) {
        case 'View all employees':
            viewAllEmployees(); // Read from db
            break;
        case 'View all roles':
            viewAllRoles();
            break;
        case 'View all departments':
            viewAllDepartments();
            break;
        case 'View employees by department':
            viewEmployeesByDepartment();
            break;
        case 'View employees by manager':
            viewEmployeesByManager();
            break;
        case 'Add a new employee':
            addNewEmployee();
            break;
        case 'Add a new role':
            addNewRole();
            break;
        case 'Add a new department':
            addDepartment();
            break;
        case 'Update employee\'s role':
            updateEmployeeRole();
            break;        
        case 'Exit':
            exit(); // Function to exit the app
            break;
    };
};

// --------------------------------------------------------------
// Async functions / db calls / print tables to console.log

async function viewAllEmployees() {
    const employees = await db.viewAllEmployees();
    console.log('\n');
    console.log('===================================================================================');
    console.table(employees);
    console.log('===================================================================================');
    console.log('\n');

    mainPrompt();
};

async function viewAllRoles() {
    const roles = await db.viewAllRoles();
    console.log('\n');
    console.log('===========================================');
    console.table(roles);
    console.log('===========================================');
    console.log('\n');

    mainPrompt();
};

async function viewAllDepartments() {
    const departments = await db.viewAllDepartments();
    console.log('\n');
    console.log('================');
    console.table(departments);
    console.log('================');
    console.log('\n');

    mainPrompt();
};

//
async function viewEmployeesByDepartment() {
    const empByDep = await db.viewEmployeesByDepartment();
    console.log('\n');
    console.log('=======================================================================');
    console.table(empByDep);
    console.log('=======================================================================');
    console.log('\n');

    mainPrompt();
};
//
async function viewEmployeesByManager() {
    const empByMan = await db.viewEmployeesByManager();
    console.log('\n');
    console.log('=======================================================================');
    console.table(empByMan);
    console.log('=======================================================================');
    console.log('\n');

    mainPrompt();
};

// Add a new employee
async function addNewEmployee() {
    inquirer.prompt(prompts.addNewEmployeePrompt)
    .then((response) => {
        connection.query(
            ` 
            INSERT INTO employees
                (first_name, last_name, role_id)
            VALUES
                (
                '${response.first_name}', 
                '${response.last_name}',
                '${response.role}'
                );
            `
        );            
        connection.query(
            ` 
            INSERT INTO roles
                (title, salary, department_id)
            VALUES 
                (
                '${response.role}',
                '${response.salary}',
                '${response.department}'
                );
            `
        );
    })
    .then(async function () {
        const showEmployees = await db.viewAllEmployees();
        console.log('\n');
        console.log('A new employee has been added!');
        console.log('\n');
        console.log('===================================================================================');
        console.table(showEmployees);
        console.log('===================================================================================');
        console.log('\n');

        mainPrompt();
      });
}


// Add a new role
async function addNewRole() { 
    inquirer.prompt(prompts.addNewRolePrompt)
    .then((response) => {
        connection.query(
        `
        INSERT INTO roles
            (department_id, title, salary)
        VALUES 
            (
            '${response.department}', 
            '${response.title}', 
            '${response.salary}'
            );
        `
        );
    })
    .then(async function () {
        const showRoles = await db.viewAllRoles();
        console.log('\n');
        console.log('The new role has been added!');
        console.log('\n');
        console.log('===========================================');
        console.table(showRoles);
        console.log('===========================================');
        console.log('\n');

        mainPrompt();
      });
};

// Add a new department
function addDepartment() {
    inquirer.prompt({
        type: 'input',
        message: 'Name of the new department?',
        name: 'department',
      })
      .then(async function (response) {
        const addDepart = await db.createDepartment(response);
        const showDept = await db.viewAllDepartments();
        console.log('\n');
        console.log("The new department has been added!");
        console.log('\n');
        console.log('================');
        console.table(showDept);
        console.log('================');
        console.log('\n');

        mainPrompt();
      });
};

// Update an employee's role
async function updateEmployeeRole() {
    const allEmployees = await db.viewAllEmployees();
    const { employee } = await inquirer.prompt([
        {
        type: 'list',
        message: 'Which employee would you like to update?',
        choices: (allEmployees.map(({ First_Name, Last_Name, id }) => ({ 
            name: `${First_Name} ${Last_Name}`,
            value: id
        }))),
        name: 'employee',
        }
    ]);

    const allRoles = await db.viewAllRoles();
    console.table(allRoles);
    const { role } = await inquirer.prompt([
        {
        type: 'list',
        message: 'What is the employee\'s new role ID?',
        choices: (allRoles.map(({ title, id }) => ({ 
            name: title,
            value: id
        }))),
        name: 'role',
        }
    ]);

    const updateRole = await db.updateEmployeeRole(employee, role);
    const showEmployees = await db.viewAllEmployees();
        console.log('\n');
        console.log('The employee\'s role have been updated.');
        console.log('\n');
        console.log('===================================================================================');
        console.table(showEmployees);
        console.log('===================================================================================');
        console.log('\n');

        mainPrompt();
};

// exit the app
function exit() {
    process.exit();
};

// --------------------------------------------------------------
// Method 2: Async function mainPrompt() / not using inquirer and
// without destructuring its response, but using choice.choice as
// the variable as choice will be returned with the promise object
// before the switch case / See what changes in prompts.js / CRUD

// async function mainPrompt() {
//     const choice = await prompts();

//     switch (choice.choice) {
//         case 'View all employees':
//             viewAllEmployees(); // Read from db
//             break;
//         case 'View all roles':
//             viewAllRoles();
//             break;
//         case 'View all departments':
//             viewAllDepartments();
//             break;
//         case 'Quit':
//             quit(); // Function to exit the app
//             break;
//     };
// };
// --------------------------------------------------------------