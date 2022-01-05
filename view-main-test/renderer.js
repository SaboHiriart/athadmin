const TabGroup = require("electron-tabs");

let tabGroup = new TabGroup();

let clientAdd = tabGroup.addTab({
  title: " Agregar Cliente",
  src: "../view-client-add/index.html",
  visible: true,
  closable: false,
  icon: "fas fa-user-plus",
  active: true,
  webviewAttributes: {
    nodeintegration: true,
    webpreferences: "contextIsolation=false, enableRemoteModule=true",
    style: "width: 85%",
  },
});

let clientSearch = tabGroup.addTab({
  title: " Consultar Clientes",
  src: "../view-client-search/index.html",
  visible: true,
  closable: false,
  icon: "fas fa-user-cog",
  webviewAttributes: {
    nodeintegration: true,
    webpreferences: "contextIsolation=false",
    style: "width: 85%",
  },
});

let clientModify = tabGroup.addTab({
  title: " Modificar Clientes",
  src: "../view-client-modify/index.html",
  visible: true,
  closable: false,
  icon: "fas fa-user-edit",
  ready: tabReady,
  webviewAttributes: {
    nodeintegration: true,
    webpreferences: "contextIsolation=false",
    style: "width: 85%",
  }
});

function tabReady(tab) {
  let webview = tab.webview;
  webview.addEventListener("dom-ready", () => {
    //webview.openDevTools();
  });
}