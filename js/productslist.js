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


/*Création du HTML après appel de l'API
**********************************************/

	//Build la liste des produits en vente sur la page index
	async function allProductsList(){
		const produits = await getProduits();

		//Création de la section accueillant la liste des produits
		let listProduct = document.createElement("section")
		listProduct.setAttribute("class", "listedesproduits");
		//Ajout de la section dans le HTML
		let main = document.getElementById("main");
		main.appendChild(listProduct);

		//Pour chaque produit de l'API on créé l'encadré HTML du produit
		produits.forEach((produit) =>
		{ 
      	//création des élements de la structure de la liste des produits en vente
      	//Une div conteneur/2 div(block gauche et droit)/une image/le nom(titre)/le prix(p)/le lien(a)
      	let produitBlock = document.createElement("div");
      	let produitBlockImage = document.createElement("div");
      	let produitTexte = document.createElement("div");
      	let produitImage = document.createElement("img");
      	let produitNom = document.createElement("h2");
      	let produitPrix = document.createElement("p");
      	let produitLien = document.createElement("a");

      	//Ajout des attributs au balise pour la création du style via le css
      	produitBlock.setAttribute("class", "ficheproduit-contenant__index");
      	produitBlockImage.setAttribute("class", "conteneur-image");
      	produitTexte.setAttribute("class", "ficheproduit-contenu__index bgc");
		produitImage.setAttribute("src", produit.imageUrl);
		produitImage.setAttribute("alt", "image du produit"); 
		produitImage.setAttribute("class", "article-image");  
		produitLien.setAttribute("href", "fiche-produit.html?id=" + produit._id);
		produitLien.setAttribute("class", "btn bgc__secondaire focus  majuscule");  

     	//Block conteneur en flex
      	//Block gauche comprend l'image du produit
     	//Bloc droit comprend le nom/prix/le lien du produit
     	listProduct.appendChild(produitBlock);
     	produitTexte.appendChild(produitBlockImage);
     	produitBlockImage.appendChild(produitImage);
     	produitBlock.appendChild(produitTexte);
     	produitTexte.appendChild(produitNom);
     	produitTexte.appendChild(produitPrix);
     	produitTexte.appendChild(produitLien);

      	//Déterminer le contenu des balises
      	produitNom.textContent = produit.name;
      	produitPrix.textContent = produit.price / 100 + " euros";
      	produitLien.textContent = "Fiche du produit";
      });
	};

