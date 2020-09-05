'use strict';

const util =  require('util');
const mysql = require('mysql');

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

connection.query = util.promisify(connection.query);

module.exports = connection;