const mysql = require('../database.js')

let user = document.getElementById('inpUser');

//const changeImg = function(){
//    var where = "user='" + user.value() + "'";
//    console.log(mysql.select('*', 'users', where, true));
//}
//user.addEventListener('propertychange', changeImg);

var result = mysql.select('*', 'users', '', false);
Object.keys(result).forEach(function(key){
    var row = result[key];
    console.log(row.nombre);
});