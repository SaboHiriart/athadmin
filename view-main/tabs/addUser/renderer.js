const fs = require("fs");
const path = require("path");
const Webcam = require("webcamjs");

function configure() {
  camAddUser.classList.remove("d-none");
  picAddUser.classList.add("d-none");
  Webcam.set({
    width: 320,
    height: 240,
    image_format: "jpeg",
    jpeg_quality: 90,
  });
  Webcam.attach("camAddUser");
}

function take_snapshot() {
  // take snapshot and get image data
  Webcam.snap(function (data_uri) {
    picAddUser.classList.remove("d-none");
    picAddUser.innerHTML = '<img id="imageprev" src="' + data_uri + '"/>';
  });
  Webcam.reset();
  camAddUser.classList.add("d-none");
}

function saveSnap() {
  // Get base64 value from <img id='imageprev'> source
  var base64image = document.getElementById("imageprev").src;
  base64image = base64image.split(";base64,").pop();
  fs.writeFile(
    "./view-login/assets/profilePics/test.jpg",
    base64image,
    { encoding: "base64" },
    function (err) {
      console.log(err);
    }
  );
}
