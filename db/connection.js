'use strict';

// Dependencies
const util =  require('util');
const mysql = require('mysql');
require('dotenv').config();

// Creating connection to localhost
const connection =  mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'employees_db'
});

connection.connect(function(err){
    if(err) throw err;
    console.log('Connected as id: ' + connection.threadId);
});

// Using util.promisify for async await functions
connection.query = util.promisify(connection.query);
// Exporting the connection
module.exports = connection;