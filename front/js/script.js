const url = 'http://localhost:3000/api/products';

// Fonction : affiche le nombre d'article sur les pages du site
function cartIcon(cart) {
    let cartNav = document.querySelectorAll('nav li')[1];
    if (cart.length < 1) {
        cartNav.innerHTML = 'Panier'
    }
    let items = 0;
    for (let i in cart) {
        items += cart[i].quantityProduct;
        let template = `Panier<span style="position: relative; bottom: 10px; left: 5px; color: #3498db;">${items}</span>`;
        cartNav.innerHTML = template;
    }
};

// Requête pour récupérer les produits présents sur l'API
async function displayProducts() {
    const requete = await fetch(url, {
        method: 'GET'
    });
    if (!requete.ok) {
        alert('Un problème est survenu !');
    } else {
        let products = await requete.json();
        //console.log(products);
        for (let i = 0; i < products.length; i++) {
            //console.log(products[i].name);
            let items = document.querySelector('#items');

            // Création des éléments (balises)
            let a = document.createElement('a');
            a.setAttribute('href', 'product.html?id=' + products[i]._id);

            let article = document.createElement('article');

            let img = document.createElement('img');
            img.setAttribute('src', products[i].imageUrl); // Insertion des données de l'API
            img.setAttribute('alt', products[i].altTxt);

            let h3 = document.createElement('h3');
            h3.className = 'productName';

            let p = document.createElement('p');
            p.setAttribute('class', 'productDescription');

            // Insertion des éléments crées dans le code html
            items.appendChild(a);
            a.appendChild(article);
            article.appendChild(img);
            article.appendChild(h3);
            article.appendChild(p);

            // Insertion des données de l'API
            h3.textContent = products[i].name;
            p.textContent = products[i].description;
        }
    }
}

displayProducts();

let cart = JSON.parse(localStorage.getItem("cart"));

cartIcon(cart);