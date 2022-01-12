const path = require("path");
const db = require("../database.js");
const Webcam = require("webcamjs");
const fs = require('fs');

const nombreCliente = document.getElementById("nombreCliente");
const apPatCliente = document.getElementById("apPatCliente");
const apMatCliente = document.getElementById("apMatCliente");
const fechaNacimeintoCliente = document.getElementById("fechaNacimientoCliente");
const fechaIngresoCliente = document.getElementById("fechaIngresoCliente");
const fechaPagoCliente = document.getElementById("fechaPagoCliente");
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
const imgCliente = document.getElementById("fotoCliente");

const selNombreCliente = document.getElementById("selNombreCliente");


var camEstatus = false;
var base64ImageAddUser;
var identificadorCliente;

setInterval('loadClientes()',30000);

imgCliente.onerror = function () {
  imgCliente.src = "../assets/clientsPics/0.png";
};

function clearForm() {
  nombreCliente.value = "";
  apPatCliente.value = "";
  apMatCliente.value = "";
  fechaNacimeintoCliente.value = "";
  correoCliente.value = "";
  telefonoCliente.value = "";
  disciplinaCliente.selectedIndex = 1;
  telefonoEmergenciaCliente.value = "";
  nombreEmergenciaCliente.value = "";
  picPhoto.innerHTML = "";
}

function loadClientes() {
  selNombreCliente.innerHTML = "";
  var sql =
    "SELECT client_id, concat_ws(' ', name, ap_pat, ap_mat) as nombre_completo FROM clients ORDER BY name ASC";
  db.query(sql, function (err, result, fields) {
    if (err) throw err;
    var opt_i = document.createElement("option");
    opt_i.value = 0;
    opt_i.innerHTML = "Seleccione un cliente";
    selNombreCliente.appendChild(opt_i);
    for (var i = 0; i < result.length; i++) {
      var opt = document.createElement("option");
      opt.value = result[i].client_id;
      opt.innerHTML = result[i].nombre_completo;
      selNombreCliente.appendChild(opt);
    }
  });
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
  imgCliente.src = "../assets/clientsPics/0.png";
}

function loadClientInfo() {
  var sql =
    "SELECT *, DATE_FORMAT(birth_date, '%Y/%m/%d') AS BirthDate, DATE_FORMAT(inscription_date, '%Y/%m/%d') AS InscriptionDate, DATE_FORMAT(payment_day, '%Y/%m/%d') AS paymentDate  FROM clients WHERE client_id=" +
    selNombreCliente.value;
  db.query(sql, function (error, result, fields) {
    if (error) throw error;
    var dateBirthDate = new Date(result[0].BirthDate);
    var dateIncreiptionDate = new Date(result[0].InscriptionDate);
    var datePaymentDate = new Date(result[0].paymentDate)
    identificadorCliente = result[0].client_id;
    nombreCliente.value = result[0].name;
    apPatCliente.value = result[0].ap_pat;
    apMatCliente.value = result[0].ap_mat;
    fechaNacimientoCliente.value = dateBirthDate.toISOString().substring(0,10);
    fechaIngresoCliente.value = dateIncreiptionDate.toISOString().substring(0,10);
    fechaPagoCliente.value = datePaymentDate.toISOString().substring(0,10);
    telefonoCliente.value = result[0].cellphone;
    nombreEmergenciaCliente.value = result[0].emergency_contact;
    telefonoEmergenciaCliente.value = result[0].emergency_cellphone;
    correoCliente.value = result[0].mail;
    disciplinaCliente.selectedIndex = result[0].discipline - 1;
    try {
      imgCliente.src = "../assets/clientsPics/" + result[0].client_id + ".jpg";
    } catch {
      imgCliente.src = "../assets/clientsPics/0.png";
    }
  });
}

function updateClient() {
  var sql =
    "UPDATE clients SET name='" +
    nombreCliente.value +
    "', ap_pat='" +
    apPatCliente.value +
    "', ap_mat='" +
    apMatCliente.value +
    "', birth_date='" + 
    fechaCliente.value +
    "', mail='" +
    correoCliente.value +
    "', cellphone='" +
    telefonoCliente.value +
    "', emergency_contact='" +
    nombreEmergenciaCliente.value +
    "', emergency_cellphone='" +
    telefonoEmergenciaCliente.value +
    "', discipline=" +
    disciplinaCliente.value + 
    " WHERE client_id=" + identificadorCliente;
    db.query(sql, function (err, result) {
      if(err) throw err;
      console.log(result.affectedRows + "records(s) updated");
      let routeAddUser =
      path.join(__dirname, "../assets/clientsPics/") + identificadorCliente + ".jpg";
      var base64ImageAddUser = imgCliente.src;
      base64ImageAddUser = base64ImageAddUser.split(";base64,").pop();
      fs.writeFile(
        routeAddUser,
        base64ImageAddUser,
        { encoding: "base64" },
        function (err) {
          selNombreCliente.selectedIndex = 0;
          loadClientes();
          clearForm();
        }
      );
    });
}

btnStart.addEventListener("click", function () {
  if (camEstatus === false) {
    camEstatus = true;
    picPhoto.classList.add("d-none");
    camPhoto.classList.remove("d-none");
    var width_cam = camPhoto.offsetWidth;
    var height_cam = camPhoto.offsetHeight;
    Webcam.set({
      width: width_cam,
      heigth: height_cam,
      image_format: "jpeg",
      jpeg_quality: 90,
    });
    Webcam.attach("camPhoto");
  }
});

btnTakePicture.addEventListener("click", function () {
  Webcam.snap(function (data_uri) {
    imgCliente.src = data_uri;
    base64ImageAddUser = data_uri;
  });
  picPhoto.classList.remove("d-none");
  Webcam.reset();
  camPhoto.classList.add("d-none");
  camEstatus = false;
});

window.onload = function () {
  loadClientes();
  loadDisciplines();
};

selNombreCliente.addEventListener("change", function () {
  if (selNombreCliente.value == 0) {
    clearForm();
  } else {
    loadClientInfo();
  }
});
