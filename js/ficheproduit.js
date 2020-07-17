/*Génération de l'URL de l'API selon le choix de produit à vendre
**********************************************/

const produitSell = "cameras"  //Au choix entre : "cameras" - "furniture" - "teddies"
const apiUrl = "https://oc-p5-api.herokuapp.com/api/" + produitSell + "/";

//id des différents produits dans l'API

let idProduit = "";



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
	
	function onLoadcartNumbers() {
		let productNumbers = localStorage.getItem('cartNumbers');
	
		if(productNumbers){
			document.getElementById('nombredeproduit').textContent = productNumbers;
		}
	}

