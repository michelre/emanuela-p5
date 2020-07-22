/*Génération de l'URL de l'API selon le choix de produit à vendre
**********************************************/

const produitSell = "cameras"  //Au choix entre : "cameras" - "furniture" - "teddies"
const apiUrl = "https://oc-p5-api.herokuapp.com/api/" + produitSell + "/";

const cart = document.querySelector("#panier"); // Récupère la section du panier
const cartTotal = document.getElementById("panier-total"); //Récupère le h3 pour le prix total
const form = document.querySelector("form"); // Récupère le formulaire

const cartInformation = {
    contact: {},
    product: [],
};
/* Stock le prix total */
let totalPrice = 0;

// Fourni l'affichage du/des produits du panier
const renderCart = (productName, productPrice, imageUrl, productId, productQuantity) => {
    /* Affiche article(s) du panier */
    const article = document.createElement("article");
    article.innerHTML = `
    <a href="fiche-produit.html?id=${productId}"><img src="${imageUrl}" width="50px"></a>
    <div class="produit-information>
        <p class="produit-nom">${productName}</p>
        <p class="produit-prix">${productPrice}</p>
    </div>
    <p class="quantity"><i class="fas fa-minus-circle">${productQuantity}</i><i class="fas fa-plus-circle"></i></p>
    <p class="supprime ">supprimer</p>`;
    cart.insertBefore(article, cartTotal); // Insère article avant cartTotal
    totalPrice += productPrice * productQuantity; /* Implémente prix */
    cartTotal.textContent = `Total : ${totalPrice}€`; /* Affiche le prix total */
    cart.appendChild(article)
};
/* Supprime élément du panier sur un clique*/
const removeElt = document.querySelector(".supprime"); 
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

const iconMoins = document.querySelector(".fas fa-minus-circle");
const soustractionItem = (iconMoins, container, productId) => {
    iconMoins.addEventListener("click", () => {
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

const iconPlus = document.querySelector(".fas fa-plus-circle");
const additionItem = (iconPlus, container, productId) => {
    iconPlus.addEventListener("click", () => {
        const panier = JSON.parse(localStorage.getItem("panier"));
        if (panier === null) return;
        if (panier[productId] === undefined) return;
        if (panier[productId].quantity >= 1) {
            panier[productId].quantity++;
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
                })
            }
        }
    );

    Array.from(inputs).forEach(checkValidity);
    Array.from(textareas).forEach(checkValidity);

// Envoie données à l'api
    post("https://oc-p5-api.herokuapp.com/api/cameras/order").then((response) => {
        const btn = document.getElementById("envoiformulaire");
        btn.addEventListener("click", () => {
            e.preventDefault();
            let panier = JSON.parse(localStorage.getItem("panier"));
            if (panier === null) {
                console.log("impossible d'envoyer le formulaire de commande")
            } else {
                postData(
                    "POST",
                    "https://oc-p5-api.herokuapp.com/api/cameras/order",
                    cartInformation
                ); // Envoie données au serveur
                window.location = `./confirmation-de-commande.html?id=${response.orderId}&price=${totalPrice}&user=${firstName.value}`; // Redirige vers la page de confirmation de commande
            }
        })
    })
}

const panier = JSON.parse(localStorage.getItem('panier'))
for(let product of Object.values(panier)){
    renderCart(product.name, product.price, product.imageUrl, product.quantity)
}
