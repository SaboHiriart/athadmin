const { ipcRenderer } = require('electron');
const db = require('../database.js');
const path = require('path');

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
            var imgPath = path.join(__dirname, 'assets', 'profilePics') + '/' +result[0].user + '.jpg';
            
        }else{
            var imgPath = path.join(__dirname, 'assets') + '/profileMain.png';
        }
        imgProfile.src = imgPath;
    });
}

//Función que valida que los campos estén llenos
const dataValidate = function(){
    if(inpUser.value === ''){
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
    if(dataValidate() === true){
        var sql = "SELECT * FROM users WHERE user='" + inpUser.value + "' AND password='" + inpPassword.value + "'";
        db.query(sql, function(err, result, fields){
            if(err) throw err;
            if(result.length >= 1){
                ipcRenderer.invoke("succesfullLogin")
            }
        });
    }
}