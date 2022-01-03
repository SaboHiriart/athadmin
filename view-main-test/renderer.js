const TabGroup = require("electron-tabs");

let tabGroup = new TabGroup();

let usuario = tabGroup.addTab({
  title: " Agregar Cliente",
  src: "../view-client-add/index.html",
  visible: true,
  closable: false,
  icon: "fas fa-user-plus",
  ready: tabReady,
  active: true,
  webviewAttributes: {
    nodeintegration: true,
    webpreferences: "contextIsolation=false",
    style: "width: 85%",
  },
});

let usuario2 = tabGroup.addTab({
  title: " Consultar Clientes",
  src: "../view-client-search/index.html",
  visible: true,
  closable: false,
  icon: "fas fa-user-edit",
  webviewAttributes: {
    nodeintegration: true,
    webpreferences: "contextIsolation=false",
    style: "width: 85%",
  },
});

function tabReady(tab) {
  console.log("ready");
  let webview = tab.webview;
  webview.addEventListener("dom-ready", () => {
    webview.openDevTools();
  });
}