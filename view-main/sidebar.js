const { ipcRenderer } = require("electron");
const db = require("../database");

var id_user;
var name_user;

const moduleValidate = function (idTab, callback) {
  var id_module = idTab;
  //console.log(idTab)
  var sql =
    "SELECT * FROM user_privilege WHERE module_id=" +
    id_module +
    " AND user_id=" +
    id_user;
  db.query(sql, function (err, result, fields) {
    if (err) throw err;
    if (result.length > 0) {
      if (result[0].allow === 1) {
        callback(true);
      } else {
        callback(false);
      }
    } else {
      callback(false);
    }
  });
};

ipcRenderer.on("userDataSender", function (event, arg) {
  id_user = arg;
  var sql = "SELECT name FROM users WHERE user_id=" + id_user;
  db.query(sql, function (err, result, field){
    if(err) throw err;
    name_user = result[0].name;
  });
  openTab(event, 'homePage');
});

function openTab(evt, tabName) {
  var tabId;
  if (tabName === "homePage") {
    tabId = 1;
  } else if (tabName === "addUser") {
    tabId = 2;
  } else if (tabName === "modifyUser") {
    tabId = 3;
  } else if (tabName === "deleteUser") {
    tabId = 4;
  }

  moduleValidate(tabId, function (resultado) {
    if (resultado === true) {
      var i, tabcontent, tablinks;
      tabcontent = document.getElementsByClassName("tabcontent");
      for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
      }
      tablinks = document.getElementsByClassName("tablinks");
      for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
      }
      document.getElementById(tabName).style.display = "block";
      document.getElementById(tabName).classList.add("active");
    }
  });
}
