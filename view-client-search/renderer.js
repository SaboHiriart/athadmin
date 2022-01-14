const fs = require("fs");
const db = require("../database");
const path = require("path");

const cuerpoTabla = document.getElementById("cuerpoTabla");
const selectCampo = document.getElementById("campoBusqueda");
const textoSearch = document.getElementById("textoBusqueda");
const btnSearch = document.getElementById("searchClients");
const disciplinaCliente = document.getElementById("disciplinaCliente");

var dataClients;

function loadClients() {
  cuerpoTabla.innerHTML = "";
  var sql =
    "SELECT clients.client_id AS idCliente, CONCAT(clients.name, ' ', clients.ap_pat, ' ', clients.ap_mat) AS nombreCliente, DATE_FORMAT(clients.birth_date, '%d/%m/%Y') AS birthDate, clients.cellphone AS clienteTelefono, CONCAT(disciplines.name, ' ', disciplines.schedule_day, ' ', disciplines.schedule_time) AS clienteDisciplina, clients.emergency_contact AS emergency_contact, clients.emergency_cellphone AS emergency_cellphone, DATE_FORMAT(clients.payment_day, '%d/%m/%Y') AS payment_day, clients.status AS status FROM clients LEFT JOIN disciplines ON clients.discipline=disciplines.discipline_id ORDER BY clients.name ASC";
  db.query(sql, function (err, result, fields) {
    if (err) throw err;
    dataClients = result;
    for (var i = 0; i < result.length; i++) {
      var status;
      if(result[i].status === 1){
        status = "Activo";
      }else{
        status = "Vencido";
      }
      cuerpoTabla.innerHTML +=
        "<tr id=" +
        result[i].idCliente +
        "><td>" +
        result[i].idCliente +
        "</td><td>" +
        result[i].nombreCliente +
        "</td><td>" +
        result[i].clienteTelefono +
        "</td><td>" +
        result[i].clienteDisciplina +
        "</td><td>" +
        result[i].payment_day +
        "</td><td>" +
        status +
        "</td><td>" +
        "<button class='btn btn-success' onclick='renovarClient(" +
        result[i].client_id + 
        ")'><i class='fas fa-dollar-sign'></i></button>" +
        "<button class='btn btn-danger' onclick='deleteClient(" +
        result[i].client_id +
        ")'><i class='fas fa-trash'></i></button>" +
        "</td></tr>";
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
  disciplinaCliente.appendChild(opt_i);
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

window.onload = function () {
  loadClients();
  loadDisciplines();
};

btnSearch.addEventListener("click", function () {
  var auxText;
  for (i = 0; i < dataClients.length; i++) {
    if (selectCampo.value == 0) {
      auxText = dataClients[i].idCliente;
    } else if (selectCampo.value == 1) {
      auxText = dataClients[i].nombreCliente;
    } else {
      auxText = dataClients[i].clienteTelefono;
    }
    auxText = auxText.toString();
    console.log(auxText + " = " + textoSearch.value);
    if (auxText.includes(textoSearch.value) === false) {
      console.log("coincidencia");
      var row = document.getElementById(dataClients[i].idCliente);
      row.parentNode.removeChild(row);
      dataClients.splice(i, 1);
    }
  }
});

disciplinaCliente.onchange = function () {
  if (disciplinaCliente.value == 0) {
    loadClients();
  } else {
    cuerpoTabla.innerHTML = "";
    var sql =
      "SELECT clients.client_id AS idCliente, CONCAT(clients.name, ' ', clients.ap_pat, ' ', clients.ap_mat) AS nombreCliente, DATE_FORMAT(clients.birth_date, '%d/%m/%Y') AS birthDate, clients.cellphone AS clienteTelefono, CONCAT(disciplines.name, ' ', disciplines.schedule_day, ' ', disciplines.schedule_time) AS clienteDisciplina, clients.emergency_contact AS emergency_contact, clients.emergency_cellphone AS emergency_cellphone, DATE_FORMAT(clients.payment_day, '%d/%m/%Y') AS payment_day, clients.status AS status FROM clients INNER JOIN disciplines ON clients.discipline=" +
      disciplinaCliente.value +
      " AND disciplines.discipline_id=clients.discipline ORDER BY clients.name ASC";
    db.query(sql, function (err, result, fields) {
      if (err) throw err;
      if (err) throw err;
    dataClients = result;
    for (var i = 0; i < result.length; i++) {
      var status;
      if(result[i].status === 1){
        status = "Activo";
      }else{
        status = "Vencido";
      }
      cuerpoTabla.innerHTML +=
        "<tr id=" +
        result[i].idCliente +
        "><td>" +
        result[i].idCliente +
        "</td><td>" +
        result[i].nombreCliente +
        "</td><td>" +
        result[i].clienteTelefono +
        "</td><td>" +
        result[i].clienteDisciplina +
        "</td><td>" +
        result[i].payment_day +
        "</td><td>" +
        status +
        "</td><td><button class='btn btn-danger' onclick='deleteClient(" +
        result[i].client_id +
        ")'><i class='fas fa-trash'></i></button>" + 
        "<button class='btn btn-success' onclick='renovarMembresia(" + 
        + result[i].client_id +
        "')><i class='fas fa-money-bill-wave'></button></td>" + 
        "</tr>";
    }
    });
  }
};
