const fs = require("fs");
const db = require("../database");
const path = require("path");

const cuerpoTabla = document.getElementById("cuerpoTabla");
const selectCampo = document.getElementById("campoBusqueda");
const textoSearch = document.getElementById("textoBusqueda");
const btnSearch = document.getElementById("searchClients");
const disciplinaCliente = document.getElementById("disciplinaCliente");

setInterval("loadClients()", 30000);
setInterval("loadDisciplines()", 300000)

function loadClients() {
  cuerpoTabla.innerHTML = "";
    var sql =
    "SELECT clients.client_id AS idCliente, CONCAT(clients.name, ' ', clients.ap_pat, ' ', clients.ap_mat) AS nombreCliente, DATE_FORMAT(clients.birth_date, '%d/%m/%Y') AS niceDate, clients.cellphone AS clienteTelefono, CONCAT(disciplines.name, ' ', disciplines.schedule_day, ' ', disciplines.schedule_time) AS clienteDisciplina, clients.emergency_contact AS emergency_contact, clients.emergency_cellphone AS emergency_cellphone FROM clients LEFT JOIN disciplines ON clients.discipline=disciplines.discipline_id ORDER BY clients.name ASC";
  db.query(sql, function (err, result, fields) {
    if (err) throw err;
    for (var i = 0; i < result.length; i++) {
      cuerpoTabla.innerHTML +=
        "<tr id=" +
        result[i].idCliente +
        "><td>" +
        result[i].idCliente +
        "</td><td>" +
        result[i].nombreCliente +
        "</td><td>" +
        result[i].niceDate +
        "</td><td>" +
        result[i].clienteTelefono +
        "</td><td>" +
        result[i].clienteDisciplina +
        "</td><td>" +
        result[i].emergency_contact +
        "</td><td>" +
        result[i].emergency_cellphone +
        "</td><td><button class='btn btn-danger' onclick='deleteClient(" +
        result[i].client_id +
        ")'><i class='fas fa-trash'></i></button></td></tr>";
    }
  });
}

function deleteClient(client_id) {
  var sql = "DELETE FROM clients WHERE client_id=" + client_id;
  db.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Numero de registros eliminados: " + result.affectedRows);
    var ruta =
      path.join(__dirname, "../") + "assets/clientsPics/" + client_id + ".jpg";
    fs.unlinkSync(ruta);
    loadClients();
    textoSearch.value = "";
    selectCampo.value = 0;
  });
}

function loadDisciplines() {
  disciplinaCliente.innerHTML = "";
  var sql = "SELECT * FROM disciplines";
  var opt_i = document.createElement("option");
  opt_i.value = 0;
  opt_i.innerHTML = "Todas";
  disciplinaCliente.appendChild(opt_i)
  db.query(sql, function (err, result, fields) {
    for (i = 0; i < result.length; i++) {
      var opt = document.createElement("option");
      opt.value = result[i].discipline_id;
      opt.innerHTML =
        result[i].name +
        " / " +
        result[i].schedule_day +
        " / " +
        result[i].schedule_time;
      disciplinaCliente.appendChild(opt);
    }
  });
}

window.onload = function (){
  loadClients(false, "");
  loadDisciplines();
};

btnSearch.addEventListener("click", function () {
  var sql;
  if (selectCampo.value == 0) {
    sql =
      "SELECT *, DATE_FORMAT(birth_date, '%d/%m/%Y') AS niceDate FROM clients WHERE client_id LIKE '" +
      textoSearch.value +
      "%' ORDER BY client_id ASC";
  } else if (selectCampo.value == 1) {
    sql =
      "SELECT *, DATE_FORMAT(birth_date, '%d/%m/%Y') AS niceDate FROM clients WHERE concat_ws(' ', name, ap_pat , ap_mat) LIKE '" +
      textoSearch.value +
      "%' ORDER BY client_id ASC";
  } else if (selectCampo.value == 2) {
    sql =
      "SELECT *, DATE_FORMAT(birth_date, '%d/%m/%Y') AS niceDate FROM clients WHERE cellphone LIKE '" +
      textoSearch.value +
      "%' ORDER BY client_id ASC";
  }
  cuerpoTabla.innerHTML = "";
  db.query(sql, function (err, result, fields) {
    if (err) throw err;
    for (var i = 0; i < result.length; i++) {
      cuerpoTabla.innerHTML +=
        "<tr id=" +
        result[i].client_id +
        "><td>" +
        result[i].client_id +
        "</td><td>" +
        result[i].name +
        " " +
        result[i].ap_pat +
        " " +
        result[i].ap_mat +
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
        "</td><td><button class='btn btn-danger' onclick='deleteClient(" +
        result[i].client_id +
        ")'><i class='fas fa-trash'></button></td></tr>";
    }
  });
});
