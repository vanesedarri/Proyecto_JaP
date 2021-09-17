var product = {};

function showImagesGallery(array){

    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){
        let imageSrc = array[i];

        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
            </div>
        </div>
        `

        document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
    }
}


function showRelatedProducts(array){

    let htmlContentToAppend2 = "";

    for(let valor of array){
        let relatedProduct = products[valor];

        htmlContentToAppend2 += `
        <div class="card col-md-3">
                  <img class=" img-thumbnail card-img-top" src="` + relatedProduct.imgSrc + `" alt="">      
                  <div class="card-body">
                    <h4>`+ relatedProduct.name +`</h4>
                    <p class="card-text">` + relatedProduct.description +`</p>
                    <a href="product-info.html">Ver más</a>
                  </div>
        </div>
        `        

        document.getElementById("relatedProducts").innerHTML = htmlContentToAppend2;
    }
}


function comments(currentCommentsArray){
    let htmlContentToAppend3 = "";
    for(let i = 0; i < currentCommentsArray.length; i++){
        let comment = currentCommentsArray[i];

        htmlContentToAppend3 += `
                    <li class="list-group-item list-group-item-danger d-flex w-100 justify-content-between">
                        <p><strong>` + comment.user + `</strong></p>
                        <p>` + comment.dateTime + ` | `+ showScore(comment.score) +`</p>
                    </li>
                        <p>` + comment.description + `</p>
            `

        document.getElementById("comments").innerHTML = htmlContentToAppend3;
    }  
}

function showScore(score){
    let stars="";
    for (let i = 0; i < score; i++) {
        stars += `<span class="fa fa-star checked"></span>;`
    }
    for (let i = score; i < 5; i ++) {
        stars += `<span class="fa fa-star"></span>;`     
    }
    return stars;
}

function saveComments(){
    var score = document.getElementById("selectScore").value;
    sessionStorage.setItem("stars", score);
    var description = document.getElementById("writeComment").value;
    sessionStorage.setItem("comment", description);
}

function addComments(array){
    let numberStars= sessionStorage.getItem("stars");
    let writing= sessionStorage.getItem("comment");
    let user_name= sessionStorage.getItem("user");
    let newComment = {
        "score": numberStars,
        "description": writing,
        "user": user_name,
        "dateTime": ""
    }
    array.push(newComment);
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

            //Agrego el comentario
            //addComments(product);
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
            comments(resultObj.data);
        } 
        });
    });
});

