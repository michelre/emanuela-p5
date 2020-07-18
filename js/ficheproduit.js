/*Génération de l'URL de l'API selon le choix de produit à vendre
**********************************************/

const produitSell = "cameras"  //Au choix entre : "cameras" - "furniture" - "teddies"
const apiUrl = "https://oc-p5-api.herokuapp.com/api/" + produitSell + "/";

//id des différents produits dans l'API

let idProduit = "";

/*Elément pour le local storage
**********************************************/

/*L'utilisateur à besoin d'un panier dans le localStorage de son navigateur
Vérifier si le panier existe dans le localStorage, sinon le créer et l'envoyer dans le localStorage au premier chargement du site quelque soit la page*/

if(localStorage.getItem("userPanier")){
	console.log("Administration : le panier de l'utilisateur existe dans le localStorage");
}else{
	console.log("Administration : Le panier n'existe pas, il va être créer et l'envoyer dans le localStorage");
  	//Le panier est un tableau de produits
  	let panierInit = [];
  	localStorage.setItem("userPanier", JSON.stringify(panierInit));
  };

  	//Tableau et objet demandé par l'API pour la commande
  	let contact;
  	let products = [];

	//L'user a maintenant un panier
	let userPanier = JSON.parse(localStorage.getItem("userPanier"));

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
	

	 /*Fonction ajouter le produit au panier de l'utilisateur
 **********************************************/
addToCart = () =>{
	//Au clic de l'user pour mettre le produit dans le panier
	let inputBuy = document.getElementById("ajoutduproduitaupanier");
	inputBuy.addEventListener("click", async function() {
		const produits = await get();
	//Récupération du panier dans le localStorage et ajout du produit dans le panier avant revoit dans le localStorage
	userPanier.push(produits);
	localStorage.setItem("userPanier", JSON.stringify(userPanier));
	console.log("Administration : le produit a été ajouté au panier");
	alert("Vous avez ajouté ce produit dans votre panier")
});
};

/*Page panier
**********************************************/

addition = () =>{
    //Vérifie si un prduit est dans le panier
    if(JSON.parse(localStorage.getItem("userPanier")).length > 0){
      //S'il n'est pas vide on supprime le message et on créé le tableau récapitulatif
      document.getElementById("panierVide").remove();

      //Création de la structure principale du tableau  
      let facture = document.createElement("table");
      let ligneTableau = document.createElement("tr");
      let colonneNom = document.createElement("th");
      let colonnePrixUnitaire = document.createElement("th");
      let colonneRemove = document.createElement("th");
      let ligneTotal = document.createElement("tr");
      let colonneRefTotal = document.createElement("th");
      let colonnePrixPaye = document.createElement("td");

      //Placement de la structure dans la page et du contenu des entetes
      let factureSection = document.getElementById("basket-resume");
      factureSection.appendChild(facture);
      facture.appendChild(ligneTableau);
      ligneTableau.appendChild(colonneNom);
      colonneNom.textContent = "Nom du produit";
      ligneTableau.appendChild(colonnePrixUnitaire);
      colonnePrixUnitaire.textContent = "Prix du produit";
      /*ligneTableau.appendChild(colonneRemove);
      colonneRemove.textContent = "Annuler un produit";
      */

      //Pour chaque produit du panier, on créé une ligne avec le nom, le prix
      
      //Init de l'incrémentation de l'id des lignes pour chaque produit
      let i = 0;
      
      JSON.parse(localStorage.getItem("userPanier")).forEach((produit)=>{
        //Création de la ligne
           //Création de la structure principale du tableau  
           let tableauPanier = document.createElement("div");
           let blockImage = document.createElement("div");
           let lienProduit = document.createElement("a");
           let imageProduit = document.createElement("img");
           let blockNom = document.createElement("div");
           let produitNom = document.createElement("a");
           let supressionProduit = document.createElement("a");
           let blockPrix = document.createElement("div");
           let produitPrix = document.createElement("p");
           let blockQuantite = document.createElement("div");
           let produitAjoute = document.createElement("a");
           let iconePlus = document.createElement("i")
           let produitQuantite = document.createElement("span");
           let produitRetir = document.createElement("a");
           let iconeMoins = document.createElement("i")
           let blockSousTotal = document.createElement("div");
           let sousTotal = document.createElement("p");
     
         //On ajoute des attributs au balise pour la création du style via le css
         tableauPanier.setAttribute("class", "panier-tableau flexbox bgc");
         blockImage.setAttribute("class", "panier-tableau__image");
         lienProduit.setAttribute("href", "fiche-produit.html?id=" + produit._id);
         imageProduit.setAttribute("src", produit.imageUrl);
         imageProduit.setAttribute("alt", "image du produit");
         blockNom.setAttribute("class", "panier-tableau__descriptionduproduit");
         produitNom.setAttribute("href", "fiche-produit.html?id=" + produit._id);
         blockPrix.setAttribute("class", "panier-tableau__prix");
         blockQuantite.setAttribute("class", "panier-tableau__quantite")
         iconePlus.setAttribute("class", "fas fa-plus-circle")
         iconeMoins.setAttribute("class", "fas fa-minus-circle")
         blockSousTotal.setAttribute("class", "panier-tableau__soustotal")
     
         //On rattache les différents éléments à leur parent
         productContainer.appendChild(tableauPanier);
         tableauPanier.appendChild(blockImage);
         blockImage.appendChild(lienProduit);
         lienProduit.appendChild(imageProduit);
         tableauPanier.appendChild(blockNom);
         blockNom.appendChild(produitNom);
         blockNom.appendChild(supressionProduit)
         tableauPanier.appendChild(blockPrix);
         blockPrix.appendChild(produitPrix);
         tableauPanier.appendChild(blockQuantite);
         blockQuantite.appendChild(produitAjoute);
         produitAjoute.appendChild(iconePlus);
         blockQuantite.appendChild(produitQuantite);
         blockQuantite.appendChild(produitRetir);
         produitAjoute.appendChild(iconeMoins);
         tableauPanier.appendChild(blockSousTotal);
         blockSousTotal.appendChild(sousTotal);
     
         //On insere les éléments provenant de l'API, nécéssaire à la lecture de la page
         produitNom.textContent = produit.nom;
         produitPrix.textContent = produit.price / 100 + " €";
         sousTotal.textContent = "******";

      //Calcule de l'addition total
      let totalPaye = 0;
      JSON.parse(localStorage.getItem("userPanier")).forEach((produit)=>{
      	totalPaye += produit.price / 100;
      });

      //Affichage du prix total à payer dans l'addition
      console.log("Administration : " + totalPaye);
      document.getElementById("sommeTotal").textContent = totalPaye + " €";
  };
}

  //Supprimer un produit du panier
  annulerProduit = (i) =>{
  	console.log("Administration : Enlever le produit à l'index " + i);
      //recupérer le array
      userPanier.splice(i, 1); 
      console.log("Administration : " + userPanier);
      //vide le localstorage
      localStorage.clear();
      console.log("Administration : localStorage vidé");
      // mettre à jour le localStorage avec le nouveau panier
      localStorage.setItem('userPanier', JSON.stringify(userPanier));
      console.log("Administration : localStorage mis à jour");
      //relancer la création de l'addition
      window.location.reload();
  };

  //Vérification du panier
  checkPanier = () =>{
    //Vérifier qu'il y ai au moins un produit dans le panier
    let etatPanier = JSON.parse(localStorage.getItem("userPanier"));
    //Si le panier est vide ou null (suppression localStorage par)=>alerte
    if(etatPanier == null){
    //Si l'utilisateur à supprimer son localStorage etatPanier sur la page basket.html et qu'il continue le process de commande
    alert("Il y a eu un problème avec votre panier, une action non autorisée a été faite. Veuillez recharger la page pour la corriger");
    return false
  }else if(etatPanier.length < 1 || etatPanier == null){
    console.log("Administration: ERROR =>le localStorage ne contient pas de panier")
    alert("Votre panier est vide");
    return false;
  }else{
    console.log("Administration : Le panier n'est pas vide")
      //Si le panier n'est pas vide on rempli le products envoyé à l'API
      JSON.parse(localStorage.getItem("userPanier")).forEach((produit) =>{
        products.push(produit._id);
      });
      console.log("Administration : Ce tableau sera envoyé à l'API : " + products)
      return true;
  }
  };

  //vérifie les inputs du formulaire
  checkInput = () =>{
    //Controle Regex
    let checkString = /[a-zA-Z]/;
    let checkNumber = /[0-9]/;
    //Source pour vérification email => emailregex.com
    let checkMail = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/y;
    let checkSpecialCharacter = /[§!@#$%^&*(),.?":{}|<>]/;

    //message fin de controle
    let checkMessage = "";

    //Récupération des inputs
    let formNom = document.getElementById("formNom").value;
    let formPrenom = document.getElementById("formPrenom").value;
    let formMail = document.getElementById("formMail").value;
    let formAdresse = document.getElementById("formAdresse").value;
    let formVille = document.getElementById("formVille").value;


      //tests des différents input du formulaire
        //Test du nom => aucun chiffre ou charactère spécial permis
        if(checkNumber.test(formNom) == true || checkSpecialCharacter.test(formNom) == true || formNom == ""){
        	checkMessage = "Vérifier/renseigner votre nom";
        }else{
        	console.log("Administration : Nom ok");
        };
        //Test du nom => aucun chiffre ou charactère spécial permis
        if(checkNumber.test(formPrenom) == true || checkSpecialCharacter.test(formPrenom) == true || formPrenom == ""){
        	checkMessage = checkMessage + "\n" + "Vérifier/renseigner votre prénom";
        }else{
        	console.log("Administration : Prénom ok");
        };
        //Test du mail selon le regex de la source L256
        if(checkMail.test(formMail) == false){
        	checkMessage = checkMessage + "\n" + "Vérifier/renseigner votre email";
        }else{
        	console.log("Administration : Adresse mail ok");
        };
        //Test de l'adresse => l'adresse ne contient pas obligatoirement un numéro de rue mais n'a pas de characteres spéciaux
        if(checkSpecialCharacter.test(formAdresse) == true || formAdresse == ""){
        	checkMessage = checkMessage + "\n" + "Vérifier/renseigner votre adresse";
        }else{
        	console.log("Administration : Adresse ok");
        };
        //Test de la ville => aucune ville en France ne comporte de chiffre ou charactères spéciaux
        if(checkSpecialCharacter.test(formVille) == true && checkNumber.test(formVille) == true || formVille == ""){
        	checkMessage = checkMessage + "\n" + "Vérifier/renseigner votre ville"
        }else{
        	console.log("Administration : Ville ok")
        };
        //Si un des champs n'est pas bon => message d'alert avec la raison
        if(checkMessage != ""){
        	alert("Il est nécessaire de :" + "\n" + checkMessage);
        }
        //Si tout est ok construction de l'objet contact => a revoir
        else{
        	contact = {
        		firstName : formNom,
        		lastName : formPrenom,
        		address : formAdresse,
        		city : formVille,
        		email : formMail
        	};
        	return contact;
        };
    };

/*Envoi du formulaire
**********************************************/

  //Fonction requet post de l'API
  envoiDonnees = (objetRequest) => {
  	return new Promise((resolve)=>{
  		let request = new XMLHttpRequest();
  		request.onreadystatechange = function() {
  			if(this.readyState == XMLHttpRequest.DONE && this.status == 201) 
  			{
          //Sauvegarde du retour de l'API dans la sessionStorage pour affichage dans order-confirm.html
          sessionStorage.setItem("order", this.responseText);

          //Chargement de la page de confirmation
          document.forms["formulairedecommande"].action = './confirmation-de-commande.html';
          document.forms["formulairedecommande"].submit();

          resolve(JSON.parse(this.responseText));
      }
  };
  request.open("POST", APIURL + "order");
  request.setRequestHeader("Content-Type", "application/json");
  request.send(objetRequest);
});
  };

  //Au click sur le btn de validation du formulaire
  validForm = () =>{
    //Ecoute de l'event click du formulaire
    let btnForm = document.getElementById("envoiPost");
    btnForm.addEventListener("click", function(){
      //Lancement des verifications du panier et du form => si Ok envoi
      if(checkPanier() == true && checkInput() != null){
      	console.log("Administration : L'envoi peut etre fait");
      //Création de l'objet à envoyer
      let objet = {
      	contact,
      	products
      };
      console.log("Administration : " + objet);
     //Conversion en JSON
     let objetRequest = JSON.stringify(objet);
     console.log("Administration : " + objetRequest);
     //Envoi de l'objet via la function
     envoiDonnees(objetRequest);

     //Une fois la commande faite retour à l'état initial des tableaux/objet/localStorage
     contact = {};
     products = [];
     localStorage.clear();
 }else{
 	console.log("Administration : ERROR");
 };
});
};

