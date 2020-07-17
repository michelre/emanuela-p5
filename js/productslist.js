/*Génération de l'URL de l'API selon le choix de produit à vendre
**********************************************/

const produitSell = "cameras"  //Au choix entre : "cameras" - "furniture" - "teddies"
const apiUrl = "https://oc-p5-api.herokuapp.com/api/" + produitSell + "/";

//id du produit pour permettre un tri dans l'API

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


/*Création de la page HTMLLde la liste des produits après appel de l'API
**********************************************/

	//Fonction pour récupérer les produits en vente sur la page index
	async function allProductsList(){
		const produits = await get();

		//Création de la section accueillant la liste des produits
		let listProduct = document.createElement("section")
		listProduct.setAttribute("class", "listedesproduits");
		//Ajout de la section au conteneur principal HTML
		let main = document.getElementById("main");
		main.appendChild(listProduct);

		//On appel chaque produit
		produits.forEach((produit) =>
		{ 
      	//On crée les élements de la structure de l'index
      	let produitBlock = document.createElement("div");
      	let produitBlockImage = document.createElement("div");
      	let produitTexte = document.createElement("div");
      	let produitImage = document.createElement("img");
      	let produitNom = document.createElement("h2");
      	let produitPrix = document.createElement("p");
      	let produitLien = document.createElement("a");

      	//On ajoute des attributs au balise pour la création du style via le css
      	produitBlock.setAttribute("class", "ficheproduit-contenant__index");
      	produitBlockImage.setAttribute("class", "conteneur-image");
      	produitTexte.setAttribute("class", "ficheproduit-contenu__index bgc");
		produitImage.setAttribute("src", produit.imageUrl);
		produitImage.setAttribute("alt", "image du produit"); 
		produitImage.setAttribute("class", "article-image");  
		produitLien.setAttribute("href", "fiche-produit.html?id=" + produit._id);
		produitLien.setAttribute("class", "btn bgc__secondaire focus  majuscule");  

     	//On rattache les différents éléments à leur parent
     	listProduct.appendChild(produitBlock);
     	produitTexte.appendChild(produitBlockImage);
     	produitBlockImage.appendChild(produitImage);
     	produitBlock.appendChild(produitTexte);
     	produitTexte.appendChild(produitNom);
     	produitTexte.appendChild(produitPrix);
     	produitTexte.appendChild(produitLien);

      	//On insere les éléments provenant de l'API, nécéssaire à la lecture de la page
      	produitNom.textContent = produit.name;
      	produitPrix.textContent = produit.price / 100 + " euros";
      	produitLien.textContent = "Fiche du produit";
      });
	};

	function onLoadcartNumbers() {
		let productNumbers = localStorage.getItem('cartNumbers');
	
		if(productNumbers){
			document.getElementById('nombredeproduit').textContent = productNumbers;
		}
	}

