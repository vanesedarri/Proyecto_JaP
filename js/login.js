function iniciarSesion(){
    let ingreso = false;
    let usuario = document.getElementById("usu").value;
    let contrasena = document.getElementById("contras").value;
    if(usuario != "" & contrasena != ""){
        ingreso = true;
    }
    if(ingreso){
         irInicio();
    } else{
         alert("Por favor ingrese e-mail y contraseña");
    }
}

function irInicio(){
    window.location("inicio.html")
}
