const Webcam = require("webcamjs");
const fs = require("fs");

const clockHomePage = document.getElementById("clockHomePage");
const nombreHomePage = document.getElementById("nombreHomePage");
const btnSubmenuUsers = document.getElementById("btnSubmenuUsers");
const icoSubmenuUsers = document.getElementById("icoSubmenuUsers");

//Add User Objects
const btnStartCamAdduser = document.getElementById("btnStartCamAddUser");
const btnTakePictureAddUser = document.getElementById("btnTakePictureAddUser");
const camAddUser = document.getElementById("camAddUser");
const picAddUser = document.getElementById("picAddUser");

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
}
showTitles();

//Funciones para AddUser Tab
var base64ImageAddUser;

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
  Webcam.snap(function(data_uri){
    picAddUser.innerHTML =  '<img src="'+data_uri+'"/>';
    base64ImageAddUser = data_uri;
  });
  picAddUser.classList.remove("d-none")
  Webcam.reset();
  camAddUser.classList.add("d-none");
};