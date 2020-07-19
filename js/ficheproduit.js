/*Génération de l'URL de l'API selon le choix de produit à vendre
**********************************************/

const produitSell = "cameras"  //Au choix entre : "cameras" - "furniture" - "teddies"
const apiUrl = "https://oc-p5-api.herokuapp.com/api/" + produitSell + "/";

//id des différents produits dans l'API

let idProduit = "";

/*Appel de l'API
**********************************************/

get = () =>{
	return new Promise((resolve) =>{
		let request = new XMLHttpRequest();
		request.onreadystatechange = function() {
			if(this.readyState == XMLHttpRequest.DONE && this.status == 200) 
			{
				resolve(JSON.parse(this.responseText));
				console.log("Vous êtes connecté à l'API");

				//L'appel est réussi => suppression des message d'erreur
				error = document.getElementById("erreur");
				//On supprime le message d'erreur s'il existe
				if(error){
					error.remove();
				}
			}else{
				console.log("Erreur de connexion à l'API");
			}
		}
		request.open("GET", apiUrl + idProduit);
		request.send();
	});
};

/*Page HTML de la fiche produit sélectionnée
**********************************************/

async function detailProduit(){
    //Collecter l'URL après le ?id= pour le récupérer uniquement sur l'API
    idProduit = location.search.substring(4);
    const produitSelected = await get();
    
    //élément de l'API a insérer dans le document HTML
    document.getElementById("imageduproduit").setAttribute("src", produitSelected.imageUrl);
    document.getElementById("nomduproduit").innerHTML = produitSelected.name;
    document.getElementById("descriptionduproduit").innerHTML = produitSelected.description;
    document.getElementById("prixduproduit").innerHTML = produitSelected.price / 100 + " €";

    
    produitSelected.lenses.forEach((produit)=>{
    		let produitOption = document.createElement("option");
    		document.getElementById("option").appendChild(produitOption).innerHTML = produit;
    	});
	};
	

