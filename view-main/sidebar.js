const { ipcRenderer } = require("electron");
const db = require("../database");

var id_user = 1;

ipcRenderer.on('userDataSender', function(event, arg) {
  alert(arg);
  id_user = arg;
});

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

window.onload = function () {
  openTab(event, 'homePage');
};

function openTab(evt, tabName) {
  var tabId;
  if(tabName === 'homePage'){
    tabId=1;
  }
  else if(tabName === 'addUser'){
    tabId = 2;
  }else if(tabName === 'searchUser'){
    tabId = 3;
  }else if(tabName === 'modifyUser'){
    tabId = 4;
  }

  moduleValidate(tabId, function (resultado) {
    if(resultado === true){
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
      document.getElementById(tabName).innerHTML = '<object type="text/html" data="./tabs/' + tabName +'/index.html" ></object>';
    }
  });
}