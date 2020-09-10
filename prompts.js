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
                'Add a new employee',
                'Add a new role',
                'Add a new department',
                'Update employee\'s role',
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
                deps.forEach(dep => {
                    arr.push(dep.id)
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

    addNewEmployeePrompt: [
        {
            type: 'input',
            message: 'New employee\'s first name?',
            name: 'first_name',
        },
        {
            type: 'input',
            message: 'New employee\'s last name?',
            name: 'last_name',
        },
        {
            type: 'list',
            message: 'New employee\'s role ID?',
            choices: (async() => {
                const arr = [];
                const roles = await db.viewAllRoles();
                roles.forEach(role => {
                    // arr.push(role.id+" "+role.Role)
                    arr.push(role.id)
                });
                return arr;
            }),
            name: 'role',
        },
        {
            type: 'input',
            message: 'New role\'s salary?',
            name: 'salary',
        },
        {
            type: 'list',
            message: 'New employee\'s department?',
            choices: (async() => {
                const arr = [];
                const deps = await db.viewAllDepartments();
                deps.forEach(dep => {
                    arr.push(dep.id)
                });
                return arr;
            }),
            name: 'department',
        },
    ],

    // updateRolePrompt: [
    //     {
    //         type: 'list',
    //         message: 'Which employee would you like to update?',
    //         choices: (async() => {
    //             const allEmployees = await db.viewAllEmployees();

    //             allEmployees.map(({ First_Name, Last_Name, id }) => ({ 
    //                 name: `${First_Name} ${Last_Name}`,
    //                 value: id
    //             }));
    //         }),
    //         name: 'employeeID',
    //     },
    //     {
    //         type: 'list',
    //         message: 'Which role would you like to update?',
    //         choices: (async() => {
    //             const roles = await db.viewAllRoles();

    //             roles.map(({ title, id }) => ({ 
    //                 name: title,
    //                 value: id
    //             }));
    //         }),
    //         name: 'roleID',
    //     },
    // ],
};

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
