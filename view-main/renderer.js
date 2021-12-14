const { ipcRenderer } = require("electron");

const btnUsuarios = document.getElementById("btnUsuarios");
const btnLogout = document.getElementById("btnLogOut");

btnLogout.onclick = function () {
  ipcRenderer.invoke("logOut");
};