'use strict';

const inquirer = require('inquirer');

function mainPrompt() {
    return inquirer.prompt(
        {
            type: 'list',
            name: 'choice',
            message: 'What would you like to do?',
            choices: [
                'View all employees',
                'View all roles',
                'View all departments',
                'Quit',
            ]
        }
    );
}

module.exports = mainPrompt;