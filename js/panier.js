/*Génération de l'URL de l'API selon le choix de produit à vendre
**********************************************/

const produitSell = "cameras"  //Au choix entre : "cameras" - "furniture" - "teddies"
const apiUrl = "https://oc-p5-api.herokuapp.com/api/" + produitSell + "/";

//id des différents produits dans l'API

let idProduit = "";

//Collecter l'URL après le ?id= pour le récupérer uniquement sur l'API
idProduit = location.search.substring(4);

const cart = document.querySelector("#cart"); // Récupère la section du panier
const cartTotal = document.getElementById("cart-total"); //Récupère le h3 pour le prix total
const form = document.querySelector("form"); // Récupère le formulaire

const cartInformation = {
  contact: {},
  products: [],
};
/* Stock le prix total */
let totalPrice = 0;

// Affiche le/les produit(s) du panier.
const displayCart = () => {
  const cartItems = JSON.parse(localStorage.getItem("panier"));
  if (Object.keys(cartItems).length > 0) {
    for (let i = 0; i < Object.keys(cartItems).length; i++) {
      // Pour chaque article du panier
      const itemId = Object.keys(cartItems)[i];
      const product = getItem(itemId); // Récupère les informations du produit
      const camId = idProduit; // Stocke l'id du produit
      const camName = response.name; // Stocke le nom du produit
      const camPrice = response.price / 100; // Stocke le prix du produit
      const camImg = response.imageUrl; // Stocke l'image du produit
      const camQuantity = cartItems[itemId].quantity;
      cartInformation.products.push(camId); // Envoie l'id du produit au tableau products de cartInformation
      renderCart(camName, camPrice, camImg, camQuantity); // Fourni l'affichage du/des produits du panier

      const remove = document.querySelectorAll(".remove")[i];
      const article = document.querySelectorAll("article")[i];
      const iconMoins = document.querySelectorAll(".fas fa-plus-circle")[i];
      const iconPlus = document.querySelectorAll(".fas fa-minus-circle")[i];
      iconMoins.style.fontSize = "20px";
      iconPlus.style.fontSize = "20px";
      deleteCart(remove, article, itemId);
      soustractionItem(iconMoins, article, itemId); // soustraction
      additionItem(iconPlus, article, itemId); // addition
    }
  } else {
    cart.textContent = "Votre panier est vide.";
    form.classList.add("invisible");
  }
};

// Fourni l'affichage du/des produits du panier
const renderCart = (productName, productPrice, imgUrl, productQuantity) => {
  /* Affiche article(s) du panier */
  const article = document.createElement("article");
  article.innerHTML = `
    <img src="${imgUrl}">
    <div class="produit-information>
        <p class="produit-nom">${productName}</p>
        <p class="produit-prix">${productPrice}</p>
    </div>
    <p class="quantity"><i class="fas fa-arrow-circle-left">${productQuantity}</i><i class="fas fa-arrow-circle-right"></i></p>
    <p class="supprime ">supprimer</p>`;
  cart.insertBefore(article, cartTotal); // Insère article avant cartTotal
  totalPrice += productPrice * productQuantity; /* Implémente prix */
  cartTotal.textContent = `Total : ${totalPrice}€`; /* Affiche le prix total */
  console.log(article);
};
/* Supprime élément du panier sur un clique*/
const deleteCart = (removeElt, container, productId) => {
  removeElt.addEventListener("click", () => {
    const panier = JSON.parse(localStorage.getItem("panier"));
    if (panier === null) return;
    if (panier[productId] === undefined) return;
    else {
      delete panier[productId];
    }
    localStorage.setItem("panier", JSON.stringify(panier));
    // ); /* Supprime item du localStorage */
    container.remove(); /* Supprime item du DOM */
    location.reload(true); /* Actualise la page dynamiquement */
  });
};

// soustrait et enlève un produit au panier

const decrementItem = (iconMoins, container, productId) => {
  iconMoins.addEventListener("click",  () => {
    const panier = JSON.parse(localStorage.getItem("panier"));
    if (panier === null) return;
    if (panier[productId] === undefined) return;
    if (panier[productId].quantity > 1) {
      panier[productId].quantity--;
    } else {
      delete panier[productId];
    }
    localStorage.setItem("panier", JSON.stringify(panier));
    // ); /* Supprime item du localStorage */
    container.remove(); /* Supprime item du DOM */
    location.reload(true);
  });
};

// additionne et rajoute un produit au panier

const incrementItem = (iconPlus, container, productId) => {
  iconPlus.addEventListener("click", () => {
    const panier = JSON.parse(localStorage.getItem("panier"));
    if (panier === null) return;
    if (panier[productId] === undefined) return;
    if (panier[productId].quantity >= 1) {
      panier[productId].quantity++;
    } else {
      delete panier[productId];
    }
    localStorage.setItem("panier", JSON.stringify(panier));
    // ); /* Supprime item du localStorage */
    container.remove(); /* Supprime item du DOM */
    location.reload(true);
  });
};

//Validation de notre formulaire de Commande

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
            e.target.parentElement.classList.add('erreur__formulaire')
        }
    })

    input.addEventListener('input', (e) => {
        if (e.target.validity.valid) {
            e.target.parentElement.classList.remove('erreur__formulaire')
            return (cartInformation.contact = {
              // Si toutes les inputs saisies sont valides, renvoie l'objet contact à cartInformation
              lastName: nomclient.value,
              firstName: prenomclient.value,
              email: emailclient.value,
              address: adresseclient.value,
              city: villeclient.value,
        })}
        }
  );

Array.from(inputs).forEach(checkValidity);
Array.from(textareas).forEach(checkValidity);

// Envoie données à l'api
post ("https://oc-p5-api.herokuapp.com/api/cameras/order").then((response)=>{

btn.addEventListener("click", (e) => {
  e.preventDefault();
  let panier = JSON.parse(localStorage.getItem("panier"));
  if (panier === null) {
    console.log ("impossible d'envoyer le formulaire de commande")
  }else {
          postData(
         "POST",
         "https://oc-p5-api.herokuapp.com/api/cameras/order",
          cartInformation
    ); // Envoie données au serveur
    window.location = `./confirmation.html?id=${response.orderId}&price=${totalPrice}&user=${firstName.value}`; // Redirige vers la page de confirmation de commande
  }
  }));
