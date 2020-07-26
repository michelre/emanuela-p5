/*Génération de l'URL de l'API selon le choix de produit à vendre
**********************************************/

const produitSell = "cameras"  //Au choix entre : "cameras" - "furniture" - "teddies"
const apiUrl = "https://oc-p5-api.herokuapp.com/api/" + produitSell + "/";

const cart = document.querySelector("#panier"); // Récupère la section du panier
const cartTotal = document.getElementById("panier-total"); //Récupère le h3 pour le prix total
const form = document.querySelector("form"); // Récupère le formulaire

const cartInformation = {
    contact: {},
    products: [],
};
/* Stock le prix total */
let totalPrice = 0;

const updateTotalPrice = () => {
    const panier = JSON.parse(localStorage.getItem('panier'))
    let totalPrice = 0;
    for (let product of Object.values(panier)) {
        totalPrice += product.price * product.quantity
    }
    cartTotal.textContent = `Total : ${totalPrice / 100}€`; /* Affiche le prix total */
}

// Fourni l'affichage du/des produits du panier
const renderCart = (productId, productName, productPrice, imgUrl, productQuantity) => {
    const totalPriceProduct = productPrice / 100 * productQuantity;
    /* Affiche article(s) du panier */
    const article = document.createElement("article");
    article.innerHTML = `
    <div class="produit-img">
    <img src="${imgUrl}" width="100">
    <button class="supprime ">supprimer</button></div>
    <div class="produit-information>
        <p class="produit-nom">${productName}</p>
        <p class="produit-prix">${productPrice / 100}</p>
    </div>
    <div class="quantity">
        <i class="fas fa-minus-circle"></i>
        <span class="product-quantity">${productQuantity}</span>
        <i class="fas fa-plus-circle"></i>
    </div>
    <p class="sous-total">Sous-total : ${totalPriceProduct}€</p>`;
    updateTotalPrice();
    cart.appendChild(article)

    deleteCart(article, productId);
    soustractionItem(article, productId);
    additionItem(article, productId)

};
/* Supprime élément du panier sur un clique*/
const deleteCart = (article, productId) => {
    const removeElt = article.querySelector(".supprime");
    removeElt.addEventListener("click", () => {
        const panier = JSON.parse(localStorage.getItem("panier"));
        if (panier === null) {
            return;
        }
        if (panier[productId] === undefined) {
            return;
        }
        delete panier[productId];
        localStorage.setItem("panier", JSON.stringify(panier));
        article.remove();
        updateTotalPrice();
    });
};

// soustrait et enlève un produit au panier

const soustractionItem = (article, productId) => {
    const iconMoins = article.querySelector(".fa-minus-circle");
    iconMoins.addEventListener("click", () => {
        const panier = JSON.parse(localStorage.getItem("panier"));
        if (panier === null) {
            return;
        }
        if (panier[productId] === undefined) {
            return;
        }
        if (panier[productId].quantity > 1) {
            const quantity = article.querySelector('.product-quantity')
            const sousTotal = article.querySelector('.sous-total')
            panier[productId].quantity--;
            quantity.textContent = panier[productId].quantity
            sousTotal.textContent = `Sous-total : ${(panier[productId].quantity * panier[productId].price) / 100}€`

        } else {
            delete panier[productId];
            article.remove();
        }
        localStorage.setItem("panier", JSON.stringify(panier));
        updateTotalPrice();
    });
};

// additionne et rajoute un produit au panier

const additionItem = (article, productId) => {
    const iconPlus = article.querySelector(".fa-plus-circle");
    iconPlus.addEventListener("click", () => {
        const panier = JSON.parse(localStorage.getItem("panier"));
        if (panier === null) {
            return;
        }
        if (panier[productId] === undefined) {
            return;
        }
        const quantity = article.querySelector('.product-quantity')
        const sousTotal = article.querySelector('.sous-total')
        panier[productId].quantity++;
        quantity.textContent = panier[productId].quantity
        sousTotal.textContent = `Sous-total : ${(panier[productId].quantity * panier[productId].price) / 100}€`
        localStorage.setItem("panier", JSON.stringify(panier));
        updateTotalPrice();
    });
};

//Validation de notre formulaire de Commande
form.addEventListener('submit', (e) => {
    e.preventDefault()
    const products = []
    const panier = JSON.parse(localStorage.getItem('panier'))
    for (let product of Object.values(panier)) {
        products.push(product.id)
    }
    const data = {
        contact: {
            lastName: e.target.nomclient.value,
            firstName: e.target.prenomclient.value,
            email: e.target.emailclient.value,
            address: e.target.adresseclient.value,
            city: e.target.villeclient.value
        },
        products
    }
    post("https://oc-p5-api.herokuapp.com/api/cameras/order", data).then((response) => {
        window.location = `./confirmation-de-commande.html?id=${response.orderId}&user=${response.contact.firstName}`; // Redirige vers la page de confirmation de commande
    })
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
}

Array.from(inputs).forEach(checkValidity);
Array.from(textareas).forEach(checkValidity);

const panier = JSON.parse(localStorage.getItem('panier'))
for (let product of Object.values(panier)) {
    renderCart(product.id, product.name, product.price, product.imageUrl, product.quantity)
}
