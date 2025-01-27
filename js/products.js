const ORDER_MENOR_PRECIO = "Menor Precio";
const ORDER_MAYOR_PRECIO = "Mayor Precio";
const ORDER_BY_PROD_SOLD = "Cant.";
var currentProductsArray = [];
var currentSortCriteria = undefined;
var minCount = undefined;
var maxCount = undefined;

function sortProducts(criteria, array){
    let result = [];
    //ORDEN ASCENDENTE EN FUNCION DEL PRECIO
    if (criteria === ORDER_MENOR_PRECIO) 
    {
        result = array.sort(function(a, b) {
            if ( a.cost < b.cost ){ return -1; }
            if ( a.cost > b.cost ){ return 1; }
            return 0;
        });
    //ORDEN DESCENDENTE EN FUNCION DEL PRECIO
    }else if (criteria === ORDER_MAYOR_PRECIO){
        result = array.sort(function(a, b) {
            if ( a.cost > b.cost ){ return -1; }
            if ( a.cost < b.cost ){ return 1; }
            return 0;
        });
    //ORDEN DESCENDENTE EN FUNCION DE LA RELEVANCIA
    }else if (criteria === ORDER_BY_PROD_SOLD){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }

    return result;
}

function showProductsList(){

    let htmlContentToAppend = "";
    for(let i = 0; i < currentProductsArray.length; i++){
        let product = currentProductsArray[i];

        if (((minCount == undefined) || (minCount != undefined && parseInt(product.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(product.cost) <= maxCount))){

            htmlContentToAppend += `
            <div class="col-md-4">
            <div class="card border-danger mb-4 shadow-sm">
            <img src="${product.imgSrc}" style="max-width:100%;height:auto;" class="card-img-top" alt="...">
            <div class="card-body">             
              <div class="d-flex justify-content-between w-100">
                <h5 class="card-title">${product.name}</h5>
                <small class="text-muted">` + product.soldCount + ` Vendidos </small>
              </div>
              <p class="card-text">${product.description}</p>
              <h5> `+ product.currency + ` ` + product.cost +` </h5>
              <a href="product-info.html" class="btn btn-danger">Ver info</a>
            </div>
            </div>
            </div>

            `
        }

        document.getElementById("cat-card-container").innerHTML = htmlContentToAppend;
    }
}

function sortAndShowProducts(sortCriteria, productsArray){
    currentSortCriteria = sortCriteria;

    if(productsArray != undefined){
        currentProductsArray = productsArray;
    }

    currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);

    //Muestro los productos ordenados
    showProductsList();
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            sortAndShowProducts(ORDER_MENOR_PRECIO, resultObj.data);
        }
    });

    document.getElementById("sortAsc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_MENOR_PRECIO);
    });

    document.getElementById("sortDesc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_MAYOR_PRECIO);
    });

    document.getElementById("sortByCount").addEventListener("click", function(){
        sortAndShowProducts(ORDER_BY_PROD_SOLD);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        showProductsList();
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function(){
        //Obtengo el mínimo y máximo de los intervalos para filtrar por precios
        //de productos.
        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0){
            minCount = parseInt(minCount);
        }
        else{
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0){
            maxCount = parseInt(maxCount);
        }
        else{
            maxCount = undefined;
        }

        showProductsList();
    });
});

//let buscar = document.getElementById('buscador');

//buscar.addEventListener("keydown", (event) => {
    // handle keydown
//});

//buscar.addEventListener("keypress", (event) => {
    // handle keypress
//});

//buscar.addEventListener("keyup", (event) => {
    // handle keyup
//});