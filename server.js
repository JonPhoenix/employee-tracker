'use strict';

const inquirer = require("inquirer");
const logo = require("asciiart-logo");
const prompts = require('./prompts');
const db = require("./db"); require("console.table");

init();

function init() {
  const logoText = logo({ name: "Tracker" }).render();
  console.log(logoText);
}

async function viewAllEmployees() {
    const employees = await db.viewAllEmployees();
    console.log('\n');
    console.table(employees);

    mainPrompt();
};