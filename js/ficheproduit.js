/*Génération de l'URL de l'API selon le choix de produit à vendre
**********************************************/

const produitSell = "cameras"  //Au choix entre : "cameras" - "furniture" - "teddies"
const APIURL = "https://oc-p5-api.herokuapp.com/api/" + produitSell + "/";

//id du produit pour permettre un tri dans l'API

let idProduit = "";

/*Appel de l'API
**********************************************/

getProduits = () =>{
	return new Promise((resolve) =>{
		let request = new XMLHttpRequest();
		request.onreadystatechange = function() {
			if(this.readyState == XMLHttpRequest.DONE && this.status == 200) 
			{
				resolve(JSON.parse(this.responseText));
				console.log("Administration : connection ok");

				//L'appel est réussi => suppression des message d'erreur
				error = document.getElementById("erreur");
				//On supprime le message d'erreur s'il existe
				if(error){
					error.remove();
				}
			}else{
				console.log("Administration : ERROR connection API");
			}
		}
		request.open("GET", APIURL + idProduit);
		request.send();
	});
};

/*Build de la page du produit sélectionné
**********************************************/

async function detailProduit(){
    //Collecter l'URL après le ?id= pour le récupérer uniquement sur l'API
    idProduit = location.search.substring(4);
    const produitSelected = await getProduits();
    
    //Remplissage de la fiche produit
    document.getElementById("imageduproduit").setAttribute("src", produitSelected.imageUrl);
    document.getElementById("nomduproduit").innerHTML = produitSelected.name;
    document.getElementById("descriptionduproduit").innerHTML = produitSelected.description;
    document.getElementById("prixduproduit").innerHTML = produitSelected.price / 100 + " €";

    
    produitSelected.lenses.forEach((produit)=>{
    		let produitOption = document.createElement("option");
    		document.getElementById("option").appendChild(produitOption).innerHTML = produit;
    	});
    };

