/* --On récupère le panier dans le storage */

let produits = JSON.parse(localStorage.getItem("produit"));
console.log(produits);
let virtualProducts = JSON.parse(localStorage.getItem("produit"));

/* -- Affichage du panier sur la page -- */
if (produits) {
    let total = 0;
    let prix = 0;
    // Affiche un tableau récapitulatif uniquement si des produits sont présents dans le localStorage
    for (let i in produits) {
        // console.log(produits[i]);
        //console.log(produits[i].idProduit);
        let items = document.querySelector("#cart__items");

        let template = `
        <article class="cart__item" data-id="${produits[i].idProduit}" data-color="${produits[i].couleurProduit}">
            <div class="cart__item__img">
                <img>
            </div>
            <div class="cart__item__content">
                <div class="cart__item__content__description">
                    
                </div>
                <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">

                    </div>
                    <div class="cart__item__content__settings__delete">
                        <p class="deleteItem">Supprimer</p>
                    </div>
                </div>
            </div>
        </article>`;

        items.innerHTML += template;

    }

    //let virtualProducts = produits; // On copie le Storage dans un panier en attente 

    for (let i in produits) {
        fetch("http://localhost:3000/api/products/" + produits[i].idProduit)
        .then(response => response.json())
        .then(product => {
            /* --Remplissage du tableau récapitulatif-- */
            let url = product.imageUrl;
            let alt = product.altTxt;
            let nom = product.name;
            let prixProduit = product.price;
            
            virtualProducts[i].price = product.price;

            let img = document.querySelectorAll('.cart__item img')[i];
            //console.log(img);
            img.setAttribute('src', url);
            img.setAttribute('alt', alt);

            let descriptionH2 = document.querySelectorAll('.cart__item__content__description')[i];
            //console.log(description);
            descriptionH2.appendChild(document.createElement('h2')).textContent = nom;

            let descriptionP = document.querySelectorAll('.cart__item__content__description')[i];
            descriptionP.appendChild(document.createElement('p')).textContent = produits[i].couleurProduit;
            descriptionP.appendChild(document.createElement('p')).textContent = prixProduit + " €";

            let settings = document.querySelectorAll('.cart__item__content__settings__quantity')[i];
            settings.appendChild(document.createElement('p')).textContent = "Qté : ";
            let p = document.querySelector('.cart__item__content__settings__quantity p');
            p.setAttribute('class', 'quantity');
            let inputElement = document.createElement('input');
            inputElement.className = "itemQuantity";
            inputElement.setAttribute('type', 'number');
            inputElement.setAttribute('name', 'itemQuantity');
            inputElement.setAttribute('min', '1');
            inputElement.setAttribute('max', '100');
            inputElement.setAttribute('value', produits[i].quantiteProduit);
            settings.appendChild(inputElement);
            let input = document.querySelectorAll('.itemQuantity')[i];

            totalPanier(virtualProducts);

            /* --Modification du panier--*/
            input.addEventListener('change', (e) => {
                let quantiteNouvelle = e.target.value;
                console.log(quantiteNouvelle);
                // console.log(e.target);
                //let idRecap = e.target.closest('.cart__item').dataset.id;
                //let couleurRecap = e.target.closest('.cart__item').dataset.color;
                console.log(produits[i].quantiteProduit);
                
                produits[i].quantiteProduit = parseInt(quantiteNouvelle);
                localStorage.setItem("produit", JSON.stringify(produits));
                virtualProducts[i].quantiteProduit = parseInt(quantiteNouvelle);
                totalPanier(virtualProducts);
                
            });

            /* ——Suppression produit—— */
            let boutonSupprimer = document.querySelectorAll('.deleteItem')[i];

            boutonSupprimer.addEventListener('click', (e) => {
                console.log(JSON.parse(localStorage.getItem("produit")));
                if (confirm("Etes-vous sûr de vouloir supprimer ce produit de votre panier ?")) {
                    
                    //let id = e.target.closest('.cart__item').dataset.id;
                    console.log(JSON.parse(localStorage.getItem("produit")));
                    let produits = JSON.parse(localStorage.getItem("produit"));
                    produits = produits.filter(function (f) { 
                        return f != produits[i]
                    })
                    virtualProducts = produits.filter(function (f) { 
                        return f != produits[i]
                    })
                    console.log(produits);
                    localStorage.setItem("produit", JSON.stringify(produits));
                    totalPanier(virtualProducts);
                    //produits = JSON.parse(localStorage.getItem("produit"));
                    let cartItem = e.target.closest('.cart__item');
                    cartItem.remove();
                    alert("Produit supprimé du panier");

                }
                    
            });

        });

    }

} 
// else {
//     document.querySelector('#cartAndFormContainer h1').textContent = "Panier vide";
// }

/* --Totaux panier-- */

function totalPanier(products) {
    let prix = 0;
    let articles = 0;
    for ( let i in products) {
        prix += products[i].price * products[i].quantiteProduit;
        articles += products[i].quantiteProduit;
    }
    let totalArticle = document.querySelector('#totalQuantity');
    let totalPrix = document.querySelector('#totalPrice');
    totalArticle.textContent = articles;
    totalPrix.textContent = prix;
}

/***** Gestion du formulaire *****/

// class Contact {
//     constructor() {
//         this.firstName = document.querySelector('#firstName').value;
//         this.lastName = document.querySelector('#lastName').value;
//         this.address = document.querySelector('#address').value;
//         this.city = document.querySelector('#city').value;
//         this.email = document.querySelector('#email').value;
//     }
// }

//let contact = new Contact;

// Récupération du formulaire saisie par l'utilisateur

let contact = {
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    email: ''
}

let prenom = document.querySelector('#firstName');
let nom = document.querySelector('#lastName');
let adresse = document.querySelector('#address');
let ville = document.querySelector('#city');
let email = document.querySelector('#email');

let prenomMessage = document.getElementById('firstNameErrorMsg');
let nomMessage = document.getElementById('lastNameErrorMsg');
let adresseMessage = document.getElementById('addressErrorMsg');
let villeMessage = document.getElementById('cityErrorMsg');
let emailMessage = document.getElementById('emailErrorMsg');

// function ecoute(cible) {
//     cible.addEventListener('input', (e) => {
//         let valeurSaisie = e.target.value;
//         contact.firstName = valeurSaisie;
//     })
// }

function validationEmail(valueInput) {
    if ((/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).test(valueInput)) {
        return true
    } else {
        return false
    }
}

prenom.addEventListener('input', (e) => {
    let valeurSaisie = e.target.value;
    console.log(valeurSaisie);
    if (valeurSaisie.match(/^[a-zA-Z]{3,20}$/g)) {
        console.log("match");
        prenomMessage.textContent = '';
    } else {
        console.log("pas bon");
        prenomMessage.textContent = "Merci de saisir un prénom entre 3 et 20 caractères";
    }
    contact.firstName = valeurSaisie;
});

nom.addEventListener('input', (e) => {
    let valeurSaisie = e.target.value;
    console.log(valeurSaisie);
    if (valeurSaisie.match(/^[a-zA-Z]{3,20}$/g)) {
        console.log("match");
        nomMessage.textContent = '';
    } else {
        console.log("pas bon");
        nomMessage.textContent = "Merci de saisir un nom entre 3 et 20 caractères";
    }
    contact.lastName = valeurSaisie;
});

adresse.addEventListener('input', (e) => {
    let valeurSaisie = e.target.value;
    console.log(valeurSaisie);
    if (valeurSaisie.match(/^[a-zA-Z0-9\s,.'-]{3,}$/)) {
        console.log("match");
        adresseMessage.textContent = '';
    } else {
        console.log("pas bon");
        adresseMessage.textContent = "Merci de saisir une adresse entre 3 et 60 caractères";
    }
    contact.address = valeurSaisie;
});

ville.addEventListener('input', (e) => {
    let valeurSaisie = e.target.value;
    console.log(valeurSaisie);
    if (valeurSaisie.match(/^[a-zA-Z-]{3,20}$/g)) {
        console.log("match");
        villeMessage.textContent = '';
    } else {
        console.log("pas bon");
        villeMessage.textContent = "Merci de saisir une ville entre 3 et 20 caractères";
    }
    contact.city = valeurSaisie;
});

email.addEventListener('input', (e) => {
    let valeurSaisie = e.target.value;
    contact.email = valeurSaisie;
    validationEmail(valeurSaisie);
    console.log(validationEmail(valeurSaisie));
    if (validationEmail(valeurSaisie)) {
        console.log("le mail est correct");
        emailMessage.textContent = '';
    } else {
        console.log("pas bon");
        emailMessage.textContent = "Merci de saisir une adresse mail valide";
    }
    contact.email = valeurSaisie;
});

// Récupération des produits dans le panier

let products = [];

for (let i in produits) {
    products.push(produits[i].idProduit);
    console.log(products);
}

/* -- Envoi du formulaire --*/

let boutonCommander = document.querySelector('#order');

boutonCommander.addEventListener('click', (e) => {

    e.preventDefault;
    let formulaire = document.querySelector('.cart__order__form');
    formulaire.setAttribute('method', 'post');

    if (prenomMessage.textContent == '' &
        nomMessage.textContent == '' &
        adresseMessage.textContent == '' &
        villeMessage.textContent == '' &
        emailMessage.textContent == '') {

        //const products = ['8906dfda133f4c20a9d0e34f18adcf06'];
        //console.log(products);

        console.log(JSON.stringify({contact, products}));

        fetch("http://localhost:3000/api/products/order", {
        method: 'POST',
        headers: {
        "Accept": 'application/json',
        "Content-Type": 'application/json',
        },
        body: JSON.stringify({contact, products})
        })
        .then(response => response.json())
        .then(data => {
            let orderId = data.orderId;
            //console.log(orderId);
            window.location = 'confirmation.html?orderId=' + orderId;
        });
    } else {
            alert("Un champs du formulaire n'est pas valide")
    }
});
