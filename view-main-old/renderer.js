const Webcam = require("webcamjs");
const fs = require("fs");
const database = require("../database");
const path = require("path");

//SideBar Objects
const btnModifyUser = document.getElementById("btnModifyUser");

//Home Page Objects
const clockHomePage = document.getElementById("clockHomePage");
const nombreHomePage = document.getElementById("nombreHomePage");
const btnSubmenuUsers = document.getElementById("btnSubmenuUsers");
const icoSubmenuUsers = document.getElementById("icoSubmenuUsers");

//Add User Objects
const btnStartCamAdduser = document.getElementById("btnStartCamAddUser");
const btnTakePictureAddUser = document.getElementById("btnTakePictureAddUser");
const camAddUser = document.getElementById("camAddUser");
const picAddUser = document.getElementById("picAddUser");
const btnSaveAddUser = document.getElementById("btnSaveAddUser");
const inpNameAddUser = document.getElementById("inpNameAddUser");
const inpUserAddUser = document.getElementById("inpUserAddUser");
const inpPasswordAddUser = document.getElementById("inpPasswordAddUser");
const inpPasswordRepAddUser = document.getElementById("inpPasswordRepAddUser");

//Modify User Objects
const selModifyUser = document.getElementById("selModifyUser");
const btnStartCamModifyUser = document.getElementById("btnStartCamModifyUser");
const btnTakePictureModifyUser = document.getElementById(
  "btnTakePictureModifyUser"
);
const camModifyUser = document.getElementById("camModifyUser");
const picModifyUser = document.getElementById("picModifyUser");
const btnSaveModifyUser = document.getElementById("btnSaveModifyUser");
const inpNameModifyUser = document.getElementById("inpNameModifyUser");
const inpUserModifyUser = document.getElementById("inpUserModifyUser");
const inpPasswordModifyUser = document.getElementById("inpPasswordModifyUser");
const inpPasswordRepModifyUser = document.getElementById(
  "inpPasswordRepModifyUser"
);

var userExpand = false;

//Funciones para los iconos de la sidebar
btnSubmenuUsers.onclick = function () {
  if (userExpand === false) {
    icoSubmenuUsers.classList.remove("fa-plus-square");
    icoSubmenuUsers.classList.add("fa-minus-square");
    userExpand = true;
  } else {
    icoSubmenuUsers.classList.remove("fa-minus-square");
    icoSubmenuUsers.classList.add("fa-plus-square");
    userExpand = false;
    console.log(userExpand);
  }
};

//Funciones para Home Tab
setInterval(showTitles, 1000);
function showTitles() {
  let time = new Date();
  let hour = time.getHours();
  let min = time.getMinutes();
  let sec = time.getSeconds();
  let date = time.getDate();
  let month = time.getMonth() + 1;
  let year = time.getFullYear();
  am_pm = " AM";

  if (hour > 12) {
    hour -= 12;
    am_pm = " PM";
  }
  if (hour == 0) {
    hr = 12;
    am_pm = " AM";
  }
  hour = hour < 10 ? "0" + hour : hour;
  min = min < 10 ? "0" + min : min;
  sec = sec < 10 ? "0" + sec : sec;
  let currentTime = hour + ":" + min + ":" + sec + am_pm;
  let currentDate = date + "/" + month + "/" + year;
  clockHomePage.innerHTML = currentDate + "<br>" + currentTime;
  nombreHomePage.innerHTML = "Bienvenido " + name_user;
};
showTitles();

//Funciones para AddUser Tab

function validateAddUserForm() {
  if (inpNameAddUser.value === "") {
    console.log("Ingrese el nombre completo.");
    return false;
  } else if (inpUserAddUser.value === "") {
    console.log("Ingrese el nombre de usuario");
    return false;
  } else if (inpPasswordAddUser.value === "") {
    console.log("Llene el campo de la contraseña");
    return false;
  } else if (inpPasswordAddUser.value != inpPasswordRepAddUser.value) {
    console.log("Las contraseñas no coinciden");
    return false;
  } else if (picAddUser.innerHTML === "") {
    console.log("Tome la foto del usuario");
    return false;
  }
  return true;
};

btnStartCamAdduser.onclick = function () {
  picAddUser.classList.add("d-none");
  camAddUser.classList.remove("d-none");
  Webcam.set({
    width: 320,
    heigth: 220,
    image_format: "jpeg",
    jpeg_quality: 90,
  });
  Webcam.attach("camAddUser");
};

btnTakePictureAddUser.onclick = function () {
  Webcam.snap(function (data_uri) {
    picAddUser.innerHTML = '<img src="' + data_uri + '" id="imgPicAddUser" />';
    base64ImageAddUser = data_uri;
  });
  picAddUser.classList.remove("d-none");
  Webcam.reset();
  camAddUser.classList.add("d-none");
};

btnSaveAddUser.onclick = function () {
  if (validateAddUserForm() === true) {
    var sql =
      "INSERT INTO users (name, user, password) values ('" +
      inpNameAddUser.value +
      "', '" +
      inpUserAddUser.value +
      "', '" +
      inpPasswordAddUser.value +
      "')";
    database.query(sql, function (err, result) {
      if (err) throw err;
      let routeAddUser =
        path.join(__dirname, "../assets/profilePics/") +
        result.insertId +
        ".jpg";
      var base64ImageAddUser = document.getElementById("imgPicAddUser").src;
      base64ImageAddUser = base64ImageAddUser.split(";base64,").pop();
      fs.writeFile(
        routeAddUser,
        base64ImageAddUser,
        { encoding: "base64" },
        function (err) {
          picAddUser.innerHTML = "";
          inpNameAddUser.value = "";
          inpUserAddUser.value = "";
          inpPasswordAddUser.value = "";
          inpPasswordRepAddUser.value = "";
        }
      );
    });
  }
};

//Funciones para ModifyUser tab
function loadUsersModifyUser() {
  selModifyUser.innerHTML = "";
  var sql = "SELECT * FROM users";
  var opt1 = document.createElement("option");
  opt1.value = -1;
  opt1.innerHTML = "Seleccione un Usuario";
  selModifyUser.appendChild(opt1);
  database.query(sql, function (err, result, fields) {
    if (err) throw err;
    for (i = 0; i < result.length; i++) {
      var opt = document.createElement("option");
      opt.value = result[i].user_id;
      opt.innerHTML = result[i].name;
      selModifyUser.appendChild(opt);
    }
  });
}

btnModifyUser.addEventListener("click", loadUsersModifyUser);

selModifyUser.addEventListener("change", function () {
  if (selModifyUser.value === "-1") {
    inpNameModifyUser.readOnly = true;
    inpUserModifyUser.readOnly = true;
    inpPasswordRepModifyUser.readOnly = true;
    inpPasswordModifyUser.readOnly = true;
  } else {
    var sql = "SELECT * FROM users WHERE user_id = " + selModifyUser.value;
    database.query(sql, function (err, result, fields) {
      if (err) throw err;
      let imgRoute =
        path.join(__dirname, "..", "assets", "profilePics/") +
        result[0].user_id +
        ".jpg";
      inpNameModifyUser.value = result[0].name;
      inpUserModifyUser.value = result[0].user;
      inpPasswordModifyUser.value = result[0].password;
      inpPasswordRepModifyUser.value = result[0].password;
      picModifyUser.innerHTML =
        '<img style="width:320px; height:220px;" src="' + imgRoute + '"></img>';
        inpNameModifyUser.readOnly = false;
      inpUserModifyUser.readOnly = true;
      inpPasswordRepModifyUser.readOnly = false;
      inpPasswordModifyUser.readOnly = false;
    });
  }
});

btnStartCamModifyUser.onclick = function () {
  picModifyUser.classList.add("d-none");
  camModifyUser.classList.remove("d-none");
  Webcam.set({
    width: 320,
    heigth: 220,
    image_format: "jpeg",
    jpeg_quality:90
  });
  Webcam.attach("camModifyUser");
};

btnTakePictureModifyUser.onclick = function () {
  Webcam.snap(function (data_uri) {
    picModifyUser.innerHTML = '<img src="' + data_uri + '" id="imgPicModifyUser" />';
  });
  picModifyUser.classList.remove("d-none");
  Webcam.reset();
  camModifyUser.classList.add("d-none");
};

btnSaveModifyUser.onclick = function () {
  var sql = "UPDATE users SET name='" + inpNameModifyUser.value + "', password='" + inpPasswordModifyUser.value + "' WHERE user_id=" + selModifyUser.value;
  database.query(sql, function(err, result){
    if(err) throw err;
    loadUsersModifyUser();
    selModifyUser.value=-1;
    inpNameModifyUser.value = "";
    inpUserModifyUser.value = "";
    inpPasswordModifyUser.value = "";
    inpPasswordRepModifyUser.value = "";
    inpNameModifyUser.readOnly = true;
    inpUserModifyUser.readOnly = true;
    inpPasswordModifyUser.readOnly = true;
    inpPasswordRepModifyUser.readOnly = true;
  });
};