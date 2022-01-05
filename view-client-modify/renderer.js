const path = require('path')
const db = require("../database.js");

const nombreCliente = document.getElementById("nombreCliente");
const apPatCliente = document.getElementById("apPatCliente");
const apMatCliente = document.getElementById("apMatCliente");
const fechaCliente = document.getElementById("fechaCliente");
const telefonoCliente = document.getElementById("telefonoCliente");
const correoCliente = document.getElementById("correoCliente");
const nombreEmergenciaCliente = document.getElementById(
  "nombreEmergenciaCliente"
);
const telefonoEmergenciaCliente = document.getElementById(
  "telefonoEmergenciaCliente"
);
const disciplinaCliente = document.getElementById("disciplinaCliente");
const btnStart = document.getElementById("btnStart");
const btnTakePicture = document.getElementById("btnTakePicture");
const picPhoto = document.getElementById("picPhoto");
const camPhoto = document.getElementById("camPhoto");
const btnGuardar = document.getElementById("btnGuardar");

const selNombreCliente = document.getElementById("selNombreCliente");

function clearForm() {
  nombreCliente.value = "";
  apPatCliente.value = "";
  apMatCliente.value = "";
  fechaCliente.value = "";
  correoCliente.value = "";
  telefonoCliente.value = "";
  disciplinaCliente.selectedIndex = 1;
  telefonoEmergenciaCliente.value = "";
  nombreEmergenciaCliente.value = "";
  picPhoto.innerHTML = "";
}

function loadClientes(){
  selNombreCliente.innerHTML="";
  var sql = "SELECT client_id, concat_ws(' ', name, ap_pat, ap_mat) as nombre_completo FROM clients ORDER BY name ASC";
  db.query(sql, function (err, result, fields) {
    if (err) throw err;
    var opt_i = document.createElement("option");
    opt_i.value = 0;
    opt_i.innerHTML = "Seleccione un cliente";
    selNombreCliente.appendChild(opt_i);
    for (var i = 0; i<result.length; i++){
      var opt = document.createElement("option");
      opt.value = result[i].client_id;
      opt.innerHTML = result[i].nombre_completo;
      selNombreCliente.appendChild(opt);
    }
  })
}

function loadDisciplines() {
  var sql = "SELECT * FROM disciplines";
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

function loadClientInfo() {
  console.log(selNombreCliente.value);
  var sql = "SELECT *, DATE_FORMAT(birth_date, '%Y/%m/%d') AS niceDate FROM clients WHERE client_id=" + selNombreCliente.value;
  db.query(sql, function (error, result, fields){
    if(error) throw error;
    console.log(result[0].niceDate);
    nombreCliente.value = result[0].name;
    apPatCliente.value = result[0].ap_pat;
    apMatCliente.value = result[0].ap_mat;
    fechaCliente.value = result[0].niceDate;
    telefonoCliente.value = result[0].cellphone;
    nombreEmergenciaCliente.value = result[0].emergency_contact;
    telefonoEmergenciaCliente.value = result[0].emergency_cellphone;
    disciplinaCliente.selectedIndex = result[0].discipline;
  });
};

window.onload = function() {
  loadClientes();
  loadDisciplines();
};

selNombreCliente.addEventListener('change', function() {
  if(selNombreCliente.value == 0){
    clearForm();
  }else{
    loadClientInfo();
  }
})