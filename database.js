const mysql = require('mysql')

var connection = new mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Sabo0512$',
    database: 'acmzo'
})

module.exports = {
    select: function(columns, table, where, whereopt){
        connection.connect(function(erro){
            if(erro) throw erro;
            var sql;
            if(whereopt === true){
                sql = 'SELECT ' + columns + ' FROM ' + table + ' WHERE ' + where + ';';
            }else{
                sql = 'SELECT ' + columns + ' FROM ' + table + ';';
            }
            connection.query(sql, function(erro, result, fields){
                if(erro) throw erro;
                return(result);
            });
        });
    },
    insert: function(){

    }
}