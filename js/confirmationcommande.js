/*Génération de l'URL de l'API selon le choix de produit à vendre
**********************************************/

const produitSell = "cameras"  //Au choix entre : "cameras" - "furniture" - "teddies"
const apiUrl = "https://oc-p5-api.herokuapp.com/api/" + produitSell + "/";

//id du produit pour permettre un tri dans l'API

let idProduit = "";



get (apiUrl).then((response)=>{
	if(sessionStorage.getItem("order") != null){
    //Parse du session storage
    let order = JSON.parse(sessionStorage.getItem("order"));
    //Implatation de prénom et de id de commande dans le html sur la page de confirmation
    document.getElementById("lastName").innerHTML = order.contact.lastName
    document.getElementById("orderId").innerHTML = order.orderId
    
    //Suppression de la clé du sessionStorage pour renvoyer au else si actualisation de la page ou via url direct
    sessionStorage.removeItem("order");
}else{
	let confirmation = document.getElementById("confirmationdecommande");
    section.style.display = "none";

confirmation = document.getElementById("confirmationdecommande");
//On supprime le message de confirmation s'il existe
if(confirmation){
confirmation.remove();
  //avertissement et redirection vers l'accueil
  alert("Aucune commande passée, vous êtes arrivé ici par erreur");
  window.open("./index.html");
}
});

