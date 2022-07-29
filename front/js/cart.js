/* --On récupère le panier dans le storage */

let produits = JSON.parse(localStorage.getItem("produit"));
//console.log(produits);


/* --Affichage du panier sur la page-- */
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

    for (let i in produits) {
        fetch("http://localhost:3000/api/products/" + produits[i].idProduit)
        .then(response => response.json())
        .then(donnees => {
            /* --Remplissage du tableau récapitulatif-- */
            let url = donnees.imageUrl;
            let alt = donnees.altTxt;
            let nom = donnees.name;
            let prixProduit = donnees.price;
            
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
            console.log(input, i);
            

            /* --Modification du panier--*/
            input.addEventListener('change', (e) => {
                let quantiteRecap = e.target.value;
                console.log(quantiteRecap);
                // console.log(e.target);
                //let idRecap = e.target.closest('.cart__item').dataset.id;
                //let couleurRecap = e.target.closest('.cart__item').dataset.color;
                console.log(produits[i].quantiteProduit);
                if (produits[i].quantiteProduit != quantiteRecap) {
                    produits[i].quantiteProduit = quantiteRecap;
                    localStorage.setItem("produit", JSON.stringify(produits));

                }
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
                    console.log(produits);
                    localStorage.setItem("produit", JSON.stringify(produits));
                    //produits = JSON.parse(localStorage.getItem("produit"));
                    let cartItem = e.target.closest('.cart__item');
                    cartItem.remove();
                    alert("Produit supprimé du panier");

                    }
                    
            });

            /* --Total-- */

            if (i = 0) {
                total = parseInt(input.value);
                prix = total * donnees.price;
            } else {
                total += parseInt(input.value);
                prix += (total * donnees.price);

            }
            let totalArticle = document.querySelector('#totalQuantity');
            let totalPrix = document.querySelector('#totalPrice');
            //console.log(totalArticle);
            totalArticle.textContent = total;
            totalPrix.textContent = prix;


        });

    }

    
}





