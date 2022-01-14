const path = require('path')

const areaDesplegadoTabs = document.getElementById("areaTab");

window.onload = cambiarDeTab("view-atendance");

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
