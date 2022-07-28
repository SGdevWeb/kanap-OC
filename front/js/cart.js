let produits = JSON.parse(localStorage.getItem("produit"));

//console.log(produits);


if (produits) {
    // Affiche un tableau récapitulatif uniquement si des produits sont présents dans le localStorage
    for (let i in produits) {
        // console.log(produits[i]);
        //console.log(produits[i].idProduit);
        let items = document.querySelector("#cart__items");

        let template = `
        <article class="cart__item" data-id="${produits[i].idProduit}" data-color="${produits[i].couleurProduit}">
            <div class="cart__item__img">
                <img alt="">
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
            let url = donnees.imageUrl;
            let alt = donnees.altTxt;
            let nom = donnees.name;
            let prix = donnees.price;
            //let divImg = document.querySelector('.cart__item__img');
            //console.log(divImg);
            //let img = divImg.appendChild(document.createElement('img'));
            //img.setAttribute('src', url);
            let img = document.querySelectorAll('.cart__item img')[i];
            //console.log(img);
            img.setAttribute('src', url);
            img.setAttribute('alt', alt);

            let descriptionH2 = document.querySelectorAll('.cart__item__content__description')[i];
            //console.log(description);
            descriptionH2.appendChild(document.createElement('h2')).textContent = nom;

            let descriptionP = document.querySelectorAll('.cart__item__content__description')[i];
            descriptionP.appendChild(document.createElement('p')).textContent = produits[i].couleurProduit;
            descriptionP.appendChild(document.createElement('p')).textContent = prix + " €";

            let settings = document.querySelectorAll('.cart__item__content__settings__quantity')[i];
            settings.appendChild(document.createElement('p')).textContent = "Qté : " + produits[i].quantiteProduit;
            settings.appendChild(document.createElement('input')).setAttribute('class', 'itemQuantity');
            let input = document.querySelectorAll('.itemQuantity')[i];
            console.log(input);
            input.setAttribute('type', 'number');
            input.setAttribute('name', 'itemQuantity');
            input.setAttribute('min', "1");
            input.setAttribute('max', "100");
            input.setAttribute('value', '2');
        })
    }
}


// let idPanier = document.querySelector('.cart__item').dataset.id;

// let urlId = "http://localhost:3000/api/products/" + idPanier

// console.log(document.querySelectorAll('.cart__item')[0]);
// console.log(idPanier);

// recupererproduits();



