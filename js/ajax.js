function get (url){
    return new Promise(function(resolve){
        let product = new XMLHttpRequest();
    product.onreadystatechange = function (){
        if(product.readyState === 4 && product.status === 200 ){
            resolve(JSON.parse(product.responseText))

            //L'appel est réussi => suppression des message d'erreur
			erreur = document.getElementById("erreur");
			//On supprime le message d'erreur s'il existe
			if(erreur){
			erreur.remove();
			}
        }
    }
    product.open("GET", url);
    product.send();

    })
  
}

function post (url, data){
    return new Promise(function(resolve){
        let product = new XMLHttpRequest();
        product.open("POST", url);
        product.send(data);
    product.onreadystatechange = function (){
        if(product.readyState === 4 && product.status === 201 ){
            resolve(JSON.parse(product.responseText))
        }
    }
    })
  
}





