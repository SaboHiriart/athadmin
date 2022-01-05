const db = require("../database");
const Webcam = require("webcamjs");
const path = require('path');
const fs = require('fs');
const nodemailer = require('nodemailer')

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

var camEstatus = false;
var base64ImageAddUser;

function maxDate() {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth();
  var yyyy = today.getFullYear();
  if (dd < 10) {
    dd = "0" + dd;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }
  today = yyyy + "-" + mm + "-" + dd;
  fechaCliente.setAttribute("max", today);
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

function validateForm() {
  if (nombreCliente.value === "") {
    return "Ingrese el Nombre del Cliente";
  } else if (apPatCliente.value === "") {
    return "Ingrese el Apellido Paterno del Cliente";
  } else if (apMatCliente.value === "") {
    return "Ingrese el Apellido Materno del Cliente";
  } else if (fechaCliente.value === "") {
    return "Ingrese la fecha de nacimiento del Cliente";
  } else if (telefonoCliente.value.length != 10) {
    return "Ingres un número de teléfono con formato válido";
  } else if (correoCliente.value === "") {
    return "Ingrese la dirección de correo del cliente";
  } else if (nombreEmergenciaCliente.value === "") {
    return "Ingrese un nombre de contacto de emergencia";
  } else if (telefonoEmergenciaCliente.value === "") {
    return "Ingrese un numero de contacto de emergencia";
  } else if (picPhoto.innerHTML === "") {
    return "Tome la foto del cliente";
  } else {
    return "true";
  }
}

function getClientID() {
  var client_id;
  var repeat = true;
  do {
    client_id = Math.floor(Math.random() * (10000 - 1)) + 1;
    var sql = "SELECT client_id FROM clients WHERE client_id=" + client_id;
    db.query(sql, function (err, result, fields) {
      if (err) throw err;
      if (result.length > 0) {
        repeat = true;
      } else {
        repeat = false;
      }
    });
  } while (!repeat);
  return client_id;
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
  picPhoto.innerHTML = "";
}

function sendClientMail(clientMail) {
   const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
          user: 'sebastian.ochoa0512@gmail.com',
          pass: '1EbN7me*6ayv8hKY'
      } 
   });

   mailOptions = {
      from: 'Contacto Sebastian',
      to: clientMail,
      subject: 'Tu registro a Athletic Center',
      text: 'Aquí esta tu número de registro'
   }

   transporter.sendMail(mailOptions, function (error, info){
      if(error){
         console.log(error);
      }else{
         console.log("Email sent: " + info.response);
      }
   });
}

window.onload = function () {
  maxDate();
  loadDisciplines();
};

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
    picPhoto.innerHTML = '<img src="' + data_uri + '" id="imgClient" />';
    base64ImageAddUser = data_uri;
  });
  picPhoto.classList.remove("d-none");
  Webcam.reset();
  camPhoto.classList.add("d-none");
  camEstatus = false;
});

btnGuardar.addEventListener("click", function () {
  var validateResult = validateForm();
  if (validateResult === "true") {
   var client_id = getClientID();
    var sql =
      "INSERT INTO clients(client_id, name, ap_pat, ap_mat, birth_date, mail, cellphone, emergency_contact, emergency_cellphone, discipline) VALUES (" +
      client_id +
      ", '" +
      nombreCliente.value +
      "', '" +
      apPatCliente.value +
      "', '" +
      apMatCliente.value +
      "', '" +
      fechaCliente.value +
      "', '" +
      correoCliente.value +
      "', '" +
      telefonoCliente.value +
      "', '" +
      nombreEmergenciaCliente.value +
      "', '" +
      telefonoEmergenciaCliente.value +
      "'," +
      disciplinaCliente.value +
      ")";
    console.log(sql);
    db.query(sql, function (err, result) {
      if (err) throw err;
      console.log("registro insertado");
      let routeAddUser =
      path.join(__dirname, "../assets/clientsPics/") + client_id + ".jpg";
      var base64ImageAddUser = document.getElementById("imgClient").src;
      base64ImageAddUser = base64ImageAddUser.split(";base64,").pop();
      fs.writeFile(
        routeAddUser,
        base64ImageAddUser,
        { encoding: "base64" },
        function (err) {
          sendClientMail(correoCliente.value);
          clearForm();
        }
      );
    });
  }
});
