function guardarCambios(){
    let datos = {};
    datos.nameAndLast = document.getElementById("nameAndLast").value;
    datos.edad = document.getElementById("edad").value;
    datos.email = document.getElementById("email").value;
    datos.telefono = document.getElementById("telefono").value;
    datos.imagen = document.getElementById("imagen").src;
    localStorage.setItem("datosPersonales", JSON.stringify(datos));
    alert("Los cambios se han realizado con éxito")

}

function mostrarImagen(){
    let preview = document.getElementById("imagen");
    let file = document.getElementById("imagenFile").files[0];
    let reader = new FileReader();
    reader.onloadend = function () {
        preview.src = reader.result;
    };
  if (file) {
    reader.readAsDataURL(file);
  } else {
    preview.src = "";
  }
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    let datos = JSON.parse(localStorage.getItem("datosPersonales"));
    document.getElementById("nameAndLast").value = datos.nameAndLast;
    document.getElementById("edad").value = datos.edad;
    document.getElementById("email").value = datos.email;
    document.getElementById("telefono").value = datos.telefono;
    document.getElementById("imagen").src = datos.imagen;

});
