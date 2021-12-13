const dialog = require('electron').remote.dialog;
const db = require('../database.js')

const inpUser = document.getElementById('inpUser');
const inpPassword = document.getElementById('inpPassword');
const btnLogin = document.getElementById('btnLogin');
const imgProfile = document.getElementById('imgProfile');


//Función que cambia la imagen de pefil al escribir el usuario
const changeProfilePic = function(e){
    var sql = "SELECT * FROM users WHERE user='" + inpUser.value + "'";
    db.query(sql, function(err, result, fields){
        if(err) throw err;
        if(result.length >= 1){
            console.log(result);
            var source = result[0].user;
            imgProfile.src="./assets/profilePics/" + source + ".jpg";
        }
    });
}

//Función que valida que los campos estén llenos
const dataValidate = function(){
    if(inpUser.value === ''){
        dialog.showMessageBox({
            title: 'Error en Credenciales',
            buttons: ['OK'],
            type: 'warning',
            message: 'tesing'
        })
        return false;
    }else if(inpPassword.value === ''){
        return false;
    }else{
        return true;
    }
}

//Eventos para el input de Usuario
inpUser.addEventListener('input', changeProfilePic);
inpUser.addEventListener('propertychange', changeProfilePic);
inpUser.addEventListener('keypress', function(event){
    if(event.keyCode === 13){
        event.preventDefault();
        inpPassword.focus();
    }
});

//Eventos para el input de Password
inpPassword.addEventListener('keypress', function(event){
    if(event.keyCode === 13){
        event.preventDefault();
        btnLogin.click();
    }
});

btnLogin.onclick = function(){
    dataValidate();
}