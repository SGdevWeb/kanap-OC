//import fetch from "node-fetch";
const url = 'http://localhost:3000/api/products';

async function recupererproduits() {
    const requete = await fetch(url, {
        method: 'GET'
    });
    if(!requete.ok) {
        alert('Un problème est survenu !');
    } else {
        let donnees = await requete.json();
        console.log(donnees);
        for (let i = 0; i < donnees.length; i++) {
            console.log(donnees[i].name);
            let items = document.querySelector('#items');

            // Création des Elements (balises)
            let a = document.createElement('a');
            a.setAttribute('href', 'product.html?id=' + donnees[i]._id);
            
            let article = document.createElement('article');
            
            let img = document.createElement('img');
            img.setAttribute('src', donnees[i].imageUrl); // Insertion des données de l'API
            img.setAttribute('alt', donnees[i].altTxt);

            let h3 = document.createElement('h3');
            h3.className = 'productName';
            
            let p = document.createElement('p');
            p.setAttribute('class', 'productDescription');

            // Ajout des éléments crées dans le code html
            items.appendChild(a);
            a.appendChild(article);
            article.appendChild(img);
            article.appendChild(h3);
            article.appendChild(p);

            // Insertion des données de l'API
            h3.textContent = donnees[i].name;
            p.textContent = donnees[i].description;
        }
    }
}

recupererproduits();
