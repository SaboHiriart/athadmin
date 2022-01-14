const path = require('path');
const db = require('../database');
const { ipcRenderer } = require("electron");

const areaDesplegadoTabs = document.getElementById("areaTab");

window.onload = function () {
  cambiarDeTab("view-atendance");
  actualizarStatusClientes();
}

function cerrarSesion(){
  ipcRenderer.invoke("logOut");
}

function actualizarStatusClientes(){
  var sql = "UPDATE clients SET status=0 WHERE NOT NOW() < DATE(payment_day) AND status=1";
  db.query(sql, function(err, result) {
    if(err) throw err;
    console.log(result.affectedRows + " record(s) updated");
  });
}

function cambiarDeTab(nombreDeTab) {
  var tabs = document.getElementsByClassName("nav-link");
  var rutaPagina = path.join(__dirname, "../") + nombreDeTab + "/index.html";
  for (var i = 0; i < tabs.length; i++) {
    tabs[i].classList.remove("active");
  }
  document.getElementById(nombreDeTab).classList.add("active");
  areaDesplegadoTabs.innerHTML =
    '<webview nodeintegration="true" webpreferences="contextIsolation=false, enableRemoteModule=true" src="' + rutaPagina + '"></webview>';
}
