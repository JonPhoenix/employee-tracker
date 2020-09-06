'use strict';

const connection = require('./connection');

// Database class / methods for db queries
class DB {
    constructor(connection) {
        this.connection =  connection;
    }

    viewAllEmployees() {
        return this.connection.query(
        `
        SELECT
            employees.id,
            employees.first_name AS First_Name,
            employees.last_name AS Last_Name,
            roles.title AS Role,
            roles.salary AS Salary,
            departments.name AS Department,
            CONCAT(manager.first_name, ' ', manager.last_name) AS Manager
        FROM
            employees
        LEFT JOIN
            roles ON employees.role_id = roles.id
        LEFT JOIN
            departments ON roles.department_id = departments.id
        LEFT JOIN
            employees manager ON employees.manager_id = manager.id
        ORDER BY
            id;
        `
        )
    }

    viewAllRoles() {
        return this.connection.query(
        `
        SELECT
            roles.id,
            roles.title AS Role,
            roles.salary AS Salary,
            departments.name AS Department
        FROM
            roles
        LEFT JOIN
            departments ON roles.department_id = departments.id
        ORDER BY
            id;
        `
        )
    }
    
    viewAllDepartments() {
        return this.connection.query(
        `
        SELECT
            departments.id,
            departments.name AS Department
        FROM
            departments
        ORDER BY
            id;
        `
        )
    }
}

// Testing
// let test = new DB (connection)

// async function firstTest() {
//     const employees = await test.viewAllEmployees()
//     console.log(employees);
// }

// firstTest()

module.exports = new DB(connection);