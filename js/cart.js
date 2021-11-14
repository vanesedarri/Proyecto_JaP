function showCarrito(){
    let productCart = [];
    let titulo ="";

            for (let i=0; i < cart.articles.length; i++){

                titulo = `<button type="button" class="btn btn-danger btn-sm">${i+1}</button>`

                let moneda = cart.articles[i].currency;
                let pesos = cart.articles[i].unitCost;
                if (moneda == "USD") {
                    pesos = pesos *40;
                }

                productCart += `<tr>
                <td><img src="${cart.articles[i].src}" style="width:100px" alt=""> ${cart.articles[i].name}</td>
                <td class="precioUnitario">${pesos}</td>
                <td><form class="was-validated"><input class="cantidades form-control" required type="number" min="1" value="${cart.articles[i].count}" onchange='subtotal()' style="width:90px"></form></td> 
                <td id='res${i}'></td>
                <td><button type="button" id='eliminar${i}' onclick='eliminarItem(${i})' class="btn btn-danger btn-sm"><i class="fa fa-trash fa-lg"></i> Eliminar</button></td></tr>
                `
            }
            document.getElementById('prodCarrito').innerHTML=titulo;
            document.getElementById("carrito").innerHTML=productCart;
            subtotal();

}

function subtotal(){
    let unitario = document.getElementsByClassName('precioUnitario');
    let cantidades = document.getElementsByClassName('cantidades');
    let sub =0;
    for (let i = 0; i < unitario.length; i++) {

        sub += parseFloat(unitario[i].innerHTML)*parseFloat(cantidades[i].value);
        document.getElementById('res'+i).innerHTML = "UYU " + parseFloat(unitario[i].innerHTML) * parseFloat(cantidades[i].value);
    }
    document.getElementById('subtotal').innerHTML=(sub).toFixed(2);
    envio();
    
}

function envio(){
    let envio =0;
    let porcentaje = 0;
    let totalCEnvio = 0;
    let subtotal = document.getElementById("subtotal").innerHTML;
    if (document.getElementById("premium").checked) {
        porcentaje = 0.15;
        envio = parseFloat(subtotal)*parseFloat(porcentaje);
        totalCEnvio = parseFloat(subtotal) + parseFloat(envio);
    }else if(document.getElementById("express").checked){
        porcentaje = 0.07;
        envio = parseFloat(subtotal)*parseFloat(porcentaje);
        totalCEnvio = parseFloat(subtotal) + parseFloat(envio);
    }else if(document.getElementById("standard").checked){
        porcentaje = 0.05;
        envio = parseFloat(subtotal)*parseFloat(porcentaje);
        totalCEnvio = parseFloat(subtotal) + parseFloat(envio);
    }
    
    document.getElementById('envio').innerHTML=(envio).toFixed(2);
    document.getElementById('total').innerHTML=parseFloat(totalCEnvio).toFixed(2);

}

function compra(){
    let totalCant = 0;
    let calle = document.getElementById("calle").value;
    let numero = document.getElementById("numero").value;
    let esquina = document.getElementById("esquina").value;
    let cantidades = document.getElementsByClassName('cantidades');
    for (let i = 0; i < cantidades.length; i++) {

       totalCant += parseFloat(cantidades[i].value);
    }
    if (totalCant ==0) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No hay productos seleccionados a comprar!',
          })
    } else if (calle==""){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Agregar Calle en Dirección de Envío!',
          })
    } else if (numero==""){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Agregar Número en Dirección de Envío!',
          })
    } else if (esquina==""){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Agregar Esquina en Dirección de Envío!',
          })
    } else if ((document.getElementById("premium").checked == false) && (document.getElementById("express").checked == false) && (document.getElementById("standard").checked == false)) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Debe seleccionar un Tipo de Envío!',
          })
    } else if (document.getElementById("formaDePago").innerHTML==""){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Debe seleccionar una Forma de Pago!',
          })
    }else{
        Swal.fire({
            icon: 'success',
            title: 'Su compra se ha realizado con éxito!',
          })
    }
    
}

function formaPagar(){
    if (document.getElementById("tarjetaCredito").checked) {
        document.getElementById("formaDePago").innerHTML = `Tarjeta de crédito`;
        document.getElementById("seleccionFormaPago").innerHTML = `Editar forma de pago`;
    }else if (document.getElementById("transferencia").checked) {
        document.getElementById("formaDePago").innerHTML = `Transferencia bancaria`;
        document.getElementById("seleccionFormaPago").innerHTML = `Editar forma de pago`;
    }
    
}

function eliminarItem(item){
    cart.articles.splice(item, 1);
    showCarrito();
    subtotal();

}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CART_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            cart = resultObj.data;
            
            showCarrito();
            
        }
    });
    document.getElementById("tarjetaCredito").addEventListener('click',()=>{
        document.getElementById("numTarjeta").disabled = false;
        document.getElementById("codigoSeg").disabled = false;
        document.getElementById("vencimiento").disabled = false;
        document.getElementById("numCuenta").disabled = true;
    });
    document.getElementById("transferencia").addEventListener('click',()=>{
        document.getElementById("numTarjeta").disabled = true;
        document.getElementById("codigoSeg").disabled = true;
        document.getElementById("vencimiento").disabled = true;
        document.getElementById("numCuenta").disabled = false;
    });
});