'use strict';

const inquirer = require('inquirer');
const logo = require("asciiart-logo");
const prompts = require('./prompts');
const db = require("./db"); 
require("console.table");

init();

function init() {
  const logoText = logo({ name: "Undecided" }).render();
  console.log(logoText);
  mainPrompt();
}

async function mainPrompt() {
    const choice = await prompts();

    switch (choice.choice) {
        case 'View all employees':
            viewAllEmployees(); // Read from db
            break;
        case 'View all roles':
            viewAllRoles();
            break;
        case 'View all departments':
            viewAllDepartments();
            break;
        case 'Quit':
            quit();
            break;
    };
};

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

function quit() {
    process.exit();
};