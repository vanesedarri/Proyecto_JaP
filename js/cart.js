function showCarrito(){
    let productCart = "";
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
                <td><input class="cantidades" type="number" min="1" value="${cart.articles[i].count}" onchange='subtotal()' style="width:70px"></td> 
                <td id='res${i}'></td>
                <td><button type="button" class="btn btn-danger btn-sm"><i class="fa fa-trash fa-lg"></i> Eliminar</button></td></tr>
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
    alert("Tu compra se realizó con éxito!");
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
});