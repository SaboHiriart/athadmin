const db = require("../database");

const inputIdCliente = document.getElementById("inputRegistroAsistencia");
const mensajeIngreso = document.getElementById("mensajeIngreso");
const fotoCliente = document.getElementById("fotoCliente");

setInterval(showTime, 1000);

function showTime() {
  let time = new Date();
  let hour = time.getHours();
  let min = time.getMinutes();
  let sec = time.getSeconds();
  am_pm = "AM";

  if (hour > 12) {
    hour -= 12;
    am_pm = "PM";
  }
  if (hour == 0) {
    hr = 12;
    am_pm = "AM";
  }

  hour = hour < 10 ? "0" + hour : hour;
  min = min < 10 ? "0" + min : min;
  sec = sec < 10 ? "0" + sec : sec;

  let currentTime = hour + ":" + min + ":" + sec + am_pm;

  document.getElementById("reloj").innerHTML = currentTime;
}

function limpiarFormulario() {
  inputIdCliente.value = "";
  fotoCliente.src = "";
  mensajeIngreso.innerHTML = "";
}

inputIdCliente.addEventListener("keypress", function (event) {
  if (event.keyCode === 13) {
    var sql = "SELECT * FROM clients WHERE client_id=" + inputIdCliente.value;  
    db.query(sql, function(err, result, fields) {
        if (err) throw err;
        if(result.length === 0){
            mensajeIngreso.innerHTML = '<div class="alert alert-warning text-center" role="alert">No se encontró el cliente</div>';
        }else{
            var fechaDeHoy = new Date;
            var fechaDePago = new Date;
            if(fechaDePago > fechaDeHoy){
                console.log("la membresía sigue vigente");
            }else {
                console.log("la membresía venció");
            }
        }
    });
  }
});
