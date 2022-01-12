const db = require('../database');

const inputIdCliente = document.getElementById("inputRegistroAsistencia");
const mensajeIngreso = document.getElementById("mensajeIngreso");
const fotoCliente = document.getElementById("fotoCliente")

setInterval(showTime, 1000);

function showTime(){
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
  
    let currentTime = hour + ":" 
            + min + ":" + sec + am_pm;
  
    document.getElementById("reloj")
            .innerHTML = currentTime;
}

function comprobarStatus (client_id) {
    var sql = "SELECT DATE_FORMAT(payment_day, '%Y/%m/%d') as payment_day FROM clients WHERE client_id = " + client_id;
    db.query(sql, function (err, result, fields) { 
        if(err) throw err;
        var date = new Date(result[0].payment_day)
        console.log(result[0].payment_day);
        console.log(result[0].payment_day --);
    });
}

inputIdCliente.addEventListener("keypress", function(event) {
    if (event.keyCode === 13){
        event.preventDefault();
        var sql = "SELECT * FROM clients WHERE client_id = " + inputIdCliente.value;
        db.query(sql, function(err, result, fields){
            if(err) throw err;
            if(result.length === 0){
                mensajeIngreso.innerHTML = '<div class="alert alert-danger text-center" role="alert">No se encontró el cliente</div>';
            }else{
                if(result[0].status === 0){
                    mensajeIngreso.innerHTML = '<div class="alert alert-danger text-center" role="alert">Membresía vencida</div>';
                }else{
                    fotoCliente.src = "../assets/clientsPics/" + inputIdCliente.value + ".jpg";
                    sql = "INSERT INTO atendance(client_id) VALUES (" + inputIdCliente.value + ")";
                    db.query(sql, function(err, results, fields){
                        if(err) throw err;
                        mensajeIngreso.innerHTML = '<div class="alert alert-success text-center" role="alert">Asistencia Registrada</div>';
                        comprobarStatus(inputIdCliente.value);
                    })
                }
            }
        })
        
    }
})