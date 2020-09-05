'use strict';

const inquirer = require("inquirer");

async function mainPrompt() {
    const { choice } = await inquirer.prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'What would you like to do?',
            choices: [
                {
                    name: 'View all employees',
                    value: 'VIEW_EMPLOYEES',
                },
            ]
        }
    ])
}