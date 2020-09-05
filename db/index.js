'use strict';

const connection = require('./connection');

class DB {
    constructor(connection) {
        this.connection =  connection;
    }

    viewAllDepartments() {
        return this.connection.query(
            `SELECT * FROM department ORDER BY id`
        )
    }

    viewAllEmployees() {
        return this.connection.query(
            `
        SELECT
            employee.id,
            employee.first_name,
            employee.last_name,
            employee.role_id,
            employee.manager_id,
            role.title,
            role.salary,
            department.name AS department
        FROM
            employee
        INNER JOIN
            role ON role_id = role_id
        INNER JOIN
            department ON department.id = role.department_id
        ORDER BY
            first_name;
        `
        )
    }
}

module.exports = new DB(connection);