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

     // Récupère la lentille choisie dans la console
  option.addEventListener("change", (e) => {
    lenseChosen = e.target.value;
    console.log(lenseChosen);
  });
// // Ajoute le produit au panier
  const btn = document.getElementById("ajoutduproduitaupanier");
  const produitdanspanier = document.createElement("div");
  let ficheduproduit = document.getElementById("ficheduproduit")
  ficheduproduit.appendChild(produitdanspanier)

  // Assigne valeur à envoyer à localStorage
  const product = {
    id: idProduit,
    name: response.name,
    price: response.price,
    imageUrl: response.imageUrl,
    personnalisation: response.lenseChoosen,
    quantity: 1,
  };

  // Envoie valeur à localStorage après un clique
  btn.addEventListener("click", () => {
    // récupérer panier localstorage
    let panier = JSON.parse(localStorage.getItem("panier"));
    if (panier === null) {
      panier = {};
    }
    // ajouter le produit au panier
    if (panier[product.id] !== undefined) {
      panier[product.id].quantity += 1;
    } else {
      panier[product.id] = product;
    }
    // update panier localstorage
    localStorage.setItem("panier", JSON.stringify(panier));
    produitdanspanier.textContent = "Le produit a été ajouté au panier !";

});
	});
	

