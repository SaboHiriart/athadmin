const mysql = require('mysql')

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Hazesa1234$',
    database: 'acmzo'
});

module.exports = db;