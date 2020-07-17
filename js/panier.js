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






function onLoadcartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');

    if(productNumbers){
        document.getElementById('nombredeproduit').textContent = productNumbers;
    }
}

function CartNumbers(product){

    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInit(productNumbers);

    if( pruductNumbers ) {
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.getElementById('nombredeproduit').textContent = productNumbers + 1;
    } else {
        localStorage.setItem('cartNumbers', 1);
        document.getElementById('nombredeproduit').textContent = 1;
    }

    setItems(product)
}

function setItems(product){
    let cartItems = locaStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if(cartItems != null) {

        if(cartItems[product.id] == undefined){
            cartItems = {
                ...cartItems,
                [product.id]: product
            }
        }
        cartItems[product.id].inCart += 1;
    }else{
        product.inCart = 1;
        cartItems = {
            [product.id]: product
     }
    }
    
    localStorage.setItems("productsInCart", JSON.stringify
    (cartItems));
}

function totalCost(product){
    let cartCost = localStorage.getItem('totalCost');

    if(cartCost != null){
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + product.price);
    } else {
        localStorage.setItem("totalCost", product.price);
    }

}

function dispalyCart() {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let productContainer = document.getElementById('panierutilisateur');

    if( cartItems && productContainer) {
        productContainer.innerHTML ='';
        Object.values(cartItems).map(items => {
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
         })
    }
}

//Validation de notre formulaire de Commande

const form = document.querySelector('form');

form.addEventListener('submit', (e) => {
    e.preventDefault()
    console.log('Nom:', e.target.nomclient.value)
    console.log('Prénom:', e.target.prenomclient.value)
    console.log('Email:', e.target.emailclient.value)
    console.log('Adresse:', e.target.adresseclient.value)
    console.log('Ville:', e.target.villeclient.value)
});

const inputs = document.querySelectorAll("input")
const textareas = document.querySelectorAll("textarea")

const checkValidity = (input) => {
    input.addEventListener('invalid', (e) => {
        e.preventDefault()
        if (!e.target.validity.valid) {
            e.target.parentElement.classList.add('erreur__form')
        }
    })

    input.addEventListener('input', (e) => {
        if (e.target.validity.valid) {
            e.target.parentElement.classList.remove('erreur__form')
        }
    })
}

Array.from(inputs).forEach(checkValidity);
Array.from(textareas).forEach(checkValidity);

/*Envoi du formulaire
**********************************************/

  //Fonction requet post de l'API
  post = (infoClient) => {
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
request.send(infoClient);
});
};

//Au click sur le bouton de validation du formulaire
validForm = () =>{
  //Ecoute de l'event click du formulaire
  let boutonFormulaire = document.getElementById("envoiformulaire");
  boutonFormulaire.addEventListener("click", function(){
    //Lancement des verifications du panier et du form => si Ok envoi
    if(checkPanier() == true && checkValidity() != null){
        console.log("La commande et le formulaire peuvent être envoyés");
    //Création de l'objet à envoyer
    let infoCommande = {
        contact,
        products
    };
    console.log("Information récupérées : " + infoCommande);
   //Conversion en JSON
   let infoClient = JSON.stringify(infoCommande);
   console.log("Information récupérées : " + infoClient);
   //Envoi de l'objet via la function
   envoiDonnees(infoClient);

   //Une fois la commande faite retour à l'état initial des tableaux/objet/localStorage
   contact = {};
   products = [];
   localStorage.clear();
}else{
   console.log("Il y a une erreur");
};
});
};
