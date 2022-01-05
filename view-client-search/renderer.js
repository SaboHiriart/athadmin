const fs = require('fs');
const db = require("../database");
const path = require("path");

const tabla = document.getElementById("Tabla");
const cuerpoTabla = document.getElementById("cuerpoTabla");

function loadClientes() {
 cuerpoTabla.innerHTML = "";
  var sql = "SELECT *, DATE_FORMAT(birth_date, '%d/%m/%Y') AS niceDate FROM clients";
  db.query(sql, function (err, result, fields) {
    if (err) throw err;
    for (var i = 0; i < result.length; i++) {
      cuerpoTabla.innerHTML +=
        "<tr id=" + result[i].client_id + "><td>" +
        result[i].client_id +
        "</td><td>" +
        result[i].name + " " + result[i].ap_pat + " " + result[i].ap_mat +
        "</td><td>" +
        result[i].niceDate +
        "</td><td>" +
        result[i].cellphone +
        "</td><td>" +
        result[i].discipline +
        "</td><td>" +
        result[i].emergency_contact +
        "</td><td>" +
        result[i].emergency_cellphone +
        "</td><td><button class='btn btn-danger' onclick='eliminarCliente(" + result[i].client_id + ")'>Delete Client</button></td></tr>";
    }
  });
}

function eliminarCliente(client_id) {
  var sql = "DELETE FROM clients WHERE client_id=" + client_id;
  db.query(sql, function(err, result){
      if(err) throw err;
      console.log("Numero de registros eliminados: " + result.affectedRows);
      var ruta = path.join(__dirname , '../') + "assets/clientsPics/" + client_id + ".jpg";
    fs.unlinkSync(ruta)
      loadClientes();
  })
}

loadClientes();
