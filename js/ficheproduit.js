/*Génération de l'URL de l'API selon le choix de produit à vendre
**********************************************/

const produitSell = "cameras"  //Au choix entre : "cameras" - "furniture" - "teddies"
const apiUrl = "https://oc-p5-api.herokuapp.com/api/" + produitSell + "/";

//id des différents produits dans l'API

let idProduit = "";

//Collecter l'URL après le ?id= pour le récupérer uniquement sur l'API
idProduit = location.search.substring(4);

/*Page HTML de la fiche produit sélectionnée
**********************************************/

get (apiUrl+idProduit).then((response)=>{
    
    
    //élément de l'API a insérer dans le document HTML
    let produitImage = document.getElementById("imageduproduit")
    produitImage.setAttribute("src", response.imageUrl);
    let produitNom = document.getElementById("nomduproduit")
    produitNom.innerHTML = response.name;
    let produitDescription = document.getElementById("descriptionduproduit")
    produitDescription.innerHTML = response.description;
    let produitPrix = document.getElementById("prixduproduit")
    produitPrix.innerHTML = response.price / 100 + " €";

    //Selon le type de produit (ligne 3) création des options
    switch(produitSell){
    	case "cameras":
            response.lenses.forEach((produit)=>{
    		let optionProduit = document.createElement("option");
    		document.getElementById("option").appendChild(optionProduit).innerHTML = produit;
    	});
    	break;
    	case "furniture":
            response.varnish.forEach((produit)=>{
    		let optionProduit = document.createElement("option");
    		document.getElementById("option").appendChild(optionProduit).innerHTML = produit;
    	});
    	break;
    	case "teddies":
            response.colors.forEach((produit)=>{
    		let optionProduit = document.createElement("option");
    		document.getElementById("option").appendChild(optionProduit).innerHTML = produit;
    	});
    	break;
    	default:
    	console.log("Administration : Veuillez bien renseigner la variable produitSell ligne 4 du fichier ficheproduit.js");
    }

      
    /*Fonction ajouter le produit au panier de l'utilisateur
 **********************************************/
 addToCart= () =>{
    //Au clic de l'user pour mettre le produit dans le panier
    let AddProductToCart = document.getElementById("ajoutduproduitaupanier");
    AddProductToCart.addEventListener("click",() =>{
    
    //Récupération du panier dans le localStorage et ajout du produit dans le panier avant revoit dans le localStorage
    userPanier.push(response);
    localStorage.setItem("userPanier", JSON.stringify(userPanier));
    console.log("Administration : le produit a été ajouté au panier");
    alert("Vous avez ajouté ce produit dans votre panier")
});
};
	});
	

