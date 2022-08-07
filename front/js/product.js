/* -- Récupération de l'url de la page -- */

let urlDeLaPage = window.location.href;
let url = new URL(urlDeLaPage);
let id = url.searchParams.get("id"); // On isole l'id de l'adresse

const urlApi = 'http://localhost:3000/api/products/' + id;


/* -- Requête pour récupérer sur l'API les données des produits de la page -- */

async function recupererProduit() {
    const requete = await fetch(urlApi, {
        method: 'GET'
    });
    if(!requete.ok) {
        alert('Un problème est survenu !');
    } else {
        let donnees = await requete.json();
        //console.log(donnees);

        // Ajout de l'image
        let img = document.createElement('img');
        img.setAttribute('src', donnees.imageUrl);
        img.setAttribute('alt', donnees.altTxt);
        document.querySelector('.item__img').appendChild(img);
        // Ajout du titre
        document.querySelector('#title').textContent = donnees.name;
        //Ajout du prix
        document.querySelector('#price').textContent = donnees.price;
        //Ajout de la description
        document.querySelector('#description').textContent = donnees.description;
        //ajout des couleurs
        donnees.colors.forEach(colors => {
            let option = document.createElement('option');
            option.setAttribute('value', colors)
            document.querySelector('#colors').appendChild(option).textContent = colors;
        });
        document.title = donnees.name;
    }
}

recupererProduit();


/* -- Création du tableau -- */

let produit = {
    'idProduit': id,
    'couleurProduit': "",
    'quantiteProduit': 0
};
produit['idProduit'] = id;

let listeCouleur = document.querySelector('#colors');

listeCouleur.addEventListener("change", function(e) {
    let couleur = e.target.value;
    produit['couleurProduit'] = couleur;
    console.log(produit);
});

let quantite = document.querySelector('#quantity');

quantite.addEventListener("input", function(e) {
    let quantiteChoisie = e.target.value;
    produit['quantiteProduit'] = parseInt(quantiteChoisie);
    console.log(produit);
});


/* -- Ajouter un produit dans le panier -- */

let a = document.querySelector("#addToCart");
//let contenuStorage = JSON.parse(localStorage.getItem("produit"));

a.addEventListener('click', () => {
    console.log("ecoute");
    // On vérifie que la couleur est saisie par l'utilisateur
    if (produit.couleurProduit == "") {
        alert("Merci de saisir une couleur")
    }
    // On vérifie que la quantité saisie par l'utilisateur n'est pas 0
    if (produit.quantiteProduit == 0) {
        alert("La quantité doit être comprise entre 1 et 100");
    }
    // On lit le contenu du LocalStorage
    let contenuStorage = JSON.parse(localStorage.getItem("produit"));

    if (contenuStorage == null) {
        contenuStorage = []; // On crée un tableau vide si le contenu est vide = pas de panier
    }
    
    if (contenuStorage.length == 0) { // On ajoute le produit au panier si panier vide
        //console.log("rien dans le panier");
        contenuStorage.push(produit);
        localStorage.setItem("produit", JSON.stringify(contenuStorage));
        contenuStorage = JSON.parse(localStorage.getItem("produit"));
    } else {
        console.log("quelque chose dans le panier");
        for (let i = 0 ; i < contenuStorage.length ; i++) {
            if(contenuStorage[i].idProduit == produit.idProduit
            & contenuStorage[i].couleurProduit == produit.couleurProduit) {
                return (
                console.log("même id même couleur"),
                console.log("Ajouter quantité"),
                contenuStorage[i].quantiteProduit += produit.quantiteProduit,
                localStorage.setItem("produit", JSON.stringify(contenuStorage)),
                contenuStorage = JSON.parse(localStorage.getItem("produit")));
            }
        } 
        for (let i = 0 ; i < contenuStorage.length ; i++) {
            if(contenuStorage[i].idProduit == produit.idProduit & 
            contenuStorage[i].couleurProduit != produit.couleurProduit) {
                return (
                console.log("même id et couleur différente"),
                console.log("Ajouter une ligne au panier"),
                contenuStorage.push(produit),
                localStorage.setItem("produit", JSON.stringify(contenuStorage)),
                contenuStorage = JSON.parse(localStorage.getItem("produit")),
                console.log(i));
            }
        }  
        for (let i = 0; i < contenuStorage.length; i++) {
            if(contenuStorage[i].idProduit != produit.idProduit) {
                return (
                    console.log("id différent"),
                    console.log("Ajouter une ligne au panier"),
                    contenuStorage.push(produit),
                    localStorage.setItem("produit", JSON.stringify(contenuStorage)),
                    contenuStorage = JSON.parse(localStorage.getItem("produit")));
            }
        }       
    } 
           
});
