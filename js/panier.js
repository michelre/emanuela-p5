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
            e.target.parentElement.id.add('erreur__formulaire')
        }
    })

    input.addEventListener('input', (e) => {
        if (e.target.validity.valid) {
            e.target.parentElement.classList.remove('erreur__formulaire')
        }
    })
}

Array.from(inputs).forEach(checkValidity);
Array.from(textareas).forEach(checkValidity);
