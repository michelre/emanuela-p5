function get(url) {
    return new Promise(function (resolve) {
        let product = new XMLHttpRequest();
        product.onreadystatechange = function () {
            if (product.readyState === 4 && product.status === 200) {
                resolve(JSON.parse(product.responseText))

                //L'appel est réussi => suppression des message d'erreur
                erreur = document.getElementById("erreur");
                //On supprime le message d'erreur s'il existe
                if (erreur) {
                    erreur.remove();
                }
            } else {
                console.log("Erreur de connexion à l'API");
            }
        }
        product.open("GET", url);
        product.send();

    })

}

function post(url, data) {
    return new Promise(function (resolve) {
        let product = new XMLHttpRequest();
        product.onreadystatechange = function () {
            if (product.readyState === 4 && product.status === 201) {
                resolve(JSON.parse(product.responseText))
            }
        }
        product.open("POST", url);
        product.setRequestHeader("Content-Type", "application/json");
        product.send(JSON.stringify(data));

    })

}





