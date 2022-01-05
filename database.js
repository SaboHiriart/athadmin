const mysql = require('mysql')

const db = mysql.createConnection({
    host: 'localhost',
    user: 'acadmin',
    password: '4C4admon',
    database: 'acmzo'
});

module.exports = db;