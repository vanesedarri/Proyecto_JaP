var product = {};
var commentsArray = {};

//Mostrar la galeria de imagenes del Chevrolet Onix Joy
function showImagesGallery(array){

    let htmlContentToAppend = "";
    let htmlContentToAppend2 = "";

    for(let i = 0; i < array.length; i++){
        let imageSrc = array[i];

        if(i==0){
        htmlContentToAppend += `
        <div class="carousel-item active">
                  <img src="${imageSrc}" class="d-block w-100" alt="">
                </div>
        `
        htmlContentToAppend2 +=`
        <li data-target="#carouselExampleIndicators" data-slide-to="${i}" class="active"></li>
        `
        }else{
            htmlContentToAppend += `
            <div class="carousel-item">
                      <img src="${imageSrc}" class="d-block w-100" alt="">
                    </div>
            `  
            htmlContentToAppend2 +=`
        <li data-target="#carouselExampleIndicators" data-slide-to="${i}"></li>
        `
        }
        document.getElementById("items").innerHTML = htmlContentToAppend;
        document.getElementById("indicador").innerHTML = htmlContentToAppend2;
    }
}


//Mostrar los productos relacionados
function showRelatedProducts(list){

    let htmlContentToAppend = "";

    for(let valor of list){
        let relatedProduct = products[valor];

        htmlContentToAppend += `
        <div class="card col-md-3">
                  <img class=" img-thumbnail card-img-top" src="` + relatedProduct.imgSrc + `" alt="">      
                  <div class="card-body">
                    <h4>`+ relatedProduct.name +`</h4>
                    <p class="card-text">` + relatedProduct.description +`</p>
                    <a href="product-info.html">Ver más</a>
                  </div>
        </div>
        `        

        document.getElementById("relatedProducts").innerHTML = htmlContentToAppend;
    }
}

//Mostrar los comentarios del JSON
function comments(currentCommentsArray){
    let htmlContentToAppend = "";
    for(let i = 0; i < currentCommentsArray.length; i++){
        let comment = currentCommentsArray[i];

        htmlContentToAppend += `
                    <li class="list-group-item list-group-item-danger d-flex w-100 justify-content-between">
                        <p><strong>` + comment.user + `</strong></p>
                        <p>` + comment.dateTime + ` | `+ showScore(comment.score) +`</p>
                    </li>
                        <p>` + comment.description + `</p>
            `

        document.getElementById("comments").innerHTML = htmlContentToAppend;
    }  
}

//Mostrar la puntuacion en formato de estrellas
function showScore(score){
    let stars="";
    for (let i = 0; i < score; i++) {
        stars += `<span class="fa fa-star checked"></span>`
    }
    for (let i = score; i < 5; i ++) {
        stars += `<span class="fa fa-star"></span>`     
    }
    return stars;
}

//Guardar nuevos comentarios
function saveComments(){
    var score = document.getElementById("selectScore").value;

    var description = document.getElementById("writeComment").value;

    //Fecha actual
    var fecha = new Date();
    var año = fecha.getFullYear();
    var mes = fecha.getMonth();
    var mesReal = mes + 1;
    var dia = fecha.getDate();
    var hora = fecha.getHours();
    var minutos = fecha.getMinutes();
    var segundos = fecha.getSeconds();
    var time = año + "-" + mesReal + "-" + dia + " " + hora + ":" + minutos + ":" + segundos;

    let user_name= sessionStorage.getItem("user");
    let newComment = {
        "score": score,
        "description": description,
        "user": user_name,
        "dateTime": time
    };
    commentsArray.push(newComment);
    document.getElementById("writeComment").value = "";
    comments(commentsArray);
}




//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            product = resultObj.data;

            let productNameHTML  = document.getElementById("productName");
            let productPriceHTML  = document.getElementById("productPrice");
            let productCategoryHTML  = document.getElementById("productCategory");
            let productDescriptionHTML = document.getElementById("productDescription");
            let productCountHTML = document.getElementById("soldCount");
        
            productNameHTML.innerHTML = product.name;
            productPriceHTML.innerHTML = product.currency + " " + product.cost;
            productCategoryHTML.innerHTML = product.category;
            productDescriptionHTML.innerHTML = product.description;
            productCountHTML.innerHTML = product.soldCount;

            //Muestro las imagenes en forma de galería
            showImagesGallery(product.images);
        }
       getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            products = resultObj.data;

            //Muestro las imagenes relacionadas en forma de galería
            showRelatedProducts(product.relatedProducts);
        } 
        });
        getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            //Muestro los comentarios cargados en el JSON
            commentsArray = resultObj.data;
            comments(commentsArray);
        } 
        });
    });
});

