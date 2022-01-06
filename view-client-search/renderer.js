const fs = require('fs');
const db = require("../database");
const path = require("path");

const cuerpoTabla = document.getElementById("cuerpoTabla");
const selectCampo = document.getElementById("campoBusqueda");
const textoSearch = document.getElementById("textoBusqueda");
const btnSearch = document.getElementById("searchClients");

setInterval('loadClients()', 30000);

function loadClients() {
  console.log("update clients");
 cuerpoTabla.innerHTML = "";
  var sql = "SELECT *, DATE_FORMAT(birth_date, '%d/%m/%Y') AS niceDate FROM clients ORDER BY name ASC";
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
        "</td><td><button class='btn btn-danger' onclick='deleteClient(" + result[i].client_id + ")'><i class='fas fa-trash'></i></button></td></tr>";
    }
  });
}

function deleteClient(client_id) {
  var sql = "DELETE FROM clients WHERE client_id=" + client_id;
  db.query(sql, function(err, result){
      if(err) throw err;
      console.log("Numero de registros eliminados: " + result.affectedRows);
      var ruta = path.join(__dirname , '../') + "assets/clientsPics/" + client_id + ".jpg";
    fs.unlinkSync(ruta)
      loadClients();
      textoSearch.value = ""
      selectCampo.value = 0;
  })
}

window.onload = loadClients();

btnSearch.addEventListener('click', function () {
  var sql;
  if(selectCampo.value == 0){
    sql = "SELECT *, DATE_FORMAT(birth_date, '%d/%m/%Y') AS niceDate FROM clients WHERE client_id LIKE '" + textoSearch.value + "%' ORDER BY client_id ASC";
  }else if(selectCampo.value  == 1){
    sql = "SELECT *, DATE_FORMAT(birth_date, '%d/%m/%Y') AS niceDate FROM clients WHERE concat_ws(' ', name, ap_pat , ap_mat) LIKE '" + textoSearch.value + "%' ORDER BY client_id ASC";
  }else if(selectCampo.value == 2){
    sql = "SELECT *, DATE_FORMAT(birth_date, '%d/%m/%Y') AS niceDate FROM clients WHERE cellphone LIKE '" + textoSearch.value + "%' ORDER BY client_id ASC";
  }
  cuerpoTabla.innerHTML = "";
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
        "</td><td><button class='btn btn-danger' onclick='deleteClient(" + result[i].client_id + ")'><i class='fas fa-trash'></button></td></tr>";
    }
  });
});