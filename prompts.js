// 'use strict';

const inquirer = require('inquirer');
const db = require('./db');

// ----------------------------------------------------
// Method 1: Prompts routed to server.js / no function
// placing the object with questions directly inside
// module.exports.

module.exports = {
    mainPrompt: [
        {
            type: 'list',
            name: 'choice',
            message: 'What would you like to do?',
            choices: [
                'View all employees',
                'View all roles',
                'View all departments',
                'View employees by department',
                'View employees by manager',
                // 'Add a new employee',
                'Add a new role',
                'Add a new department',
                // 'Update employee',
                'Exit',
            ]
        }
    ],

    addNewRolePrompt: [
        {
            type: 'list',
            message: 'New role\'s department\'s id?',
            choices: (async() => {
                const arr = [];
                const deps = await db.viewAllDepartments();
                deps.forEach(deps => {
                    arr.push(deps.id)
                });
                return arr;
            }),
            name: 'department',
        },
        {
            type: 'input',
            message: 'New role\'s title?',
            name: 'title',
        },
        {
            type: 'input',
            message: 'New role\'s salary?',
            name: 'salary',
        },
    ],
}


// ----------------------------------------------------
// Method 2: Prompts routed to server.js / function and
// return inquirer / module.exports to export ship it to
// the main command server.js after.

// function mainPrompt() {
//     return inquirer.prompt(
//         {
//             type: 'list',
//             name: 'choice',
//             message: 'What would you like to do?',
//             choices: [
//                 'View all employees',
//                 'View all roles',
//                 'View all departments',
//                 'Quit',
//             ]
//         }
//     );
// }

// module.exports = mainPrompt;

// ----------------------------------------------------
