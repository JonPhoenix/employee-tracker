'use strict';
// Dependencies
const inquirer = require('inquirer');
const logo = require("asciiart-logo");
const prompts = require('./prompts');
const db = require("./db"); 
require("console.table");

// Init function with asciiart-logo and mainPrompt() call
init();

function init() {
  const logoText = logo({ name: "Undecided" }).render();
  console.log(logoText);
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
        case 'Add employee':
            addEmployee();
            break;
        case 'Quit':
            quit(); // Function to exit the app
            break;
    };
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
// Async functions / db calls / print tables to console.log

async function viewAllEmployees() {
    const employees = await db.viewAllEmployees();
    console.log('\n');
    console.table(employees);
    console.log('====================================================================================');
    mainPrompt();
};

async function viewAllRoles() {
    const roles = await db.viewAllRoles();
    console.log('\n');
    console.table(roles);
    console.log('===========================================');
    mainPrompt();
};

async function viewAllDepartments() {
    const departments = await db.viewAllDepartments();
    console.log('\n');
    console.table(departments);
    console.log('================');
    mainPrompt();
};

//
async function viewEmployeesByDepartment() {
    const empByDep = await db.viewEmployeesByDepartment();
    console.log('\n');
    console.table(empByDep);
    console.log('=======================================================================');
    mainPrompt();
};
//
async function viewEmployeesByManager() {
    const empByMan = await db.viewEmployeesByManager();
    console.log('\n');
    console.table(empByMan);
    console.log('=======================================================================');
    mainPrompt();
};

function quit() {
    process.exit();
};