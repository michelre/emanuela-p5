const cart = document.querySelector("#panier"); // Récupère la section du panier
const cartTotal = document.getElementById("panier-total"); //Récupère le h3 pour le prix total
const form = document.querySelector("form"); // Récupère le formulaire

const cartInformation = {
  contact: {},
  products: [],
};
/* Stock le prix total */
let totalPrice = 0;

// Affiche le/les produit(s) du panier.
const displayCart = async () => {
  const cartItems = JSON.parse(localStorage.getItem("panier"));
  if (Object.keys(cartItems).length > 0) {
    for (let i = 0; i < Object.keys(cartItems).length; i++) {
      // Pour chaque article du panier
      const itemId = Object.keys(cartItems)[i];
      const product = await getItem(itemId); // Récupère les informations du produit
      const camId = product._id; // Stocke l'id du produit
      const camName = product.name; // Stocke le nom du produit
      const camPrice = product.price / 100; // Stocke le prix du produit
      const camImg = product.imageUrl; // Stocke l'image du produit
      const camQuantity = cartItems[itemId].quantity;
      cartInformation.products.push(camId); // Envoie l'id du produit au tableau products de cartInformation
      renderCart(camName, camPrice, camImg, camQuantity); // Fourni l'affichage du/des produits du panier

      const remove = document.querySelectorAll(".supprime")[i];
      const article = document.querySelectorAll("article")[i];
      const iconMoins = document.querySelectorAll(".fas fa-plus-circle")[i];
      const iconPlus = document.querySelectorAll(".fas fa-minus-circle")[i];
      iconMoins.style.fontSize = "20px";
      iconPlus.style.fontSize = "20px";
      deleteCart(remove, article, itemId);
      decrementItem(iconMoins, article, itemId); // appel de la fonction décrémentation avec la flèche de gauche
      incrementItem(iconPlus, article, itemId); // appel de la fonction incrémentation avec la flèche de droite
    }
  } else {
    cart.textContent = "Votre panier est vide.";
    form.classList.add("invisible");
  }
};
// Récupère élément dans localStorage
const getItem = async (productId) => {
  const response = await fetch(
    "https://oc-p5-api.herokuapp.com/api/cameras" + productId
  );
  return await response.json();
};
// Fourni l'affichage du/des produits du panier
const renderCart = (productName, productPrice, imgUrl, productQuantity) => {
  /* Affiche article(s) du panier */
  const article = document.createElement("article");
  article.innerHTML = `
    <img src="${imgUrl}">
    <div class="product-information>
        <p class="product-title">${productName}</p>
        <p class="price">${productPrice}</p>
    </div>
    <p class="quantity"><i class="fas fa-minus-circle">${productQuantity}</i><i class="fas fa-plus-circle"></i></p>
    <p class="supprime ">supprimer</p>`;
  cart.insertBefore(article, cartTotal); // Insère article avant cartTotal
  totalPrice += productPrice * productQuantity; /* Implémente prix */
  cartTotal.textContent = `Total : ${totalPrice}€`; /* Affiche le prix total */
  console.log(article);
};
/* Supprime élément du panier sur un clique*/
const deleteCart = (removeElt, container, productId) => {
  removeElt.addEventListener("click", async () => {
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

// soustrait et enlève un produit au panier avec la flèche de gauche

const soustractionItem = (iconMoins, container, productId) => {
  iconMoins.addEventListener("click", async () => {
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

// additione et rajoute un produit au panier

const additionItem = (iconPlus, container, productId) => {
  iconPlus.addEventListener("click", async () => {
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

displayCart();

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
const btn = document.getElementById("envoiformulaire");
const postData = async (method, url, dataElt) => {
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
    method,
    body: JSON.stringify(dataElt),
  });
  return await response.json();
};

btn.addEventListener("click", async (e) => {
  e.preventDefault();
  const validForm = formValidate(); // Valide le formulaire
  if (validForm !== false) {
    const response = await postData(
      "POST",
      "https://oc-p5-api.herokuapp.com/api/order",
      cartInformation
    ); // Envoie données au serveur
    window.location = `./fiche-produit?id=${response.orderId}&price=${totalPrice}&user=${firstName.value}`; // Redirige vers la page de confirmation de commande
  }
});
