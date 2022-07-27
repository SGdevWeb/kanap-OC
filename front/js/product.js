// On récupère l'url de la page
let urlDeLaPage = window.location.href;
let url = new URL(urlDeLaPage);
let id = url.searchParams.get("id"); // On isole l'id de l'adresse

const urlApi = 'http://localhost:3000/api/products/' + id;

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
    }
}

recupererProduit();

// Création du tableau 
let produit = {
    'idProduit': id,
    'couleurProduit': "",
    'quantiteProduit': ""
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
    let nbQuantiteChoisie = parseInt(quantiteChoisie);
    produit['quantiteProduit'] = nbQuantiteChoisie;
    console.log(produit);
});

// Ajouter un produit dans le panier
let a = document.querySelector("#addToCart");

//let contenuStorage = JSON.parse(localStorage.getItem("produit"));

a.addEventListener('click', () => {
    console.log("ecoute");
    // get();
    // ajouterAuPanier(produit);
    let contenuStorage = JSON.parse(localStorage.getItem("produit"));


    if (contenuStorage == null) {
        //console.log("rien dans le panier");
        contenuStorage = [];
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

        
        // }
        // for (let i = 0 ; i < contenuStorage.length ; i++) {
        //     if(contenuStorage[i].couleurProduit != produit.couleurProduit) {
        //         console.log("couleur différente");
        //         console.log("ajouter une ligne au panier");
        //     } else {
        //         console.log("même couleur");
        //         console.log("Ajouter quantité");
        //     }
        // }
            
});





// On teste l'id --> vrai / faux
// Faux --> on s'arrete 
// vrai --> on teste la couleur 
// vrai --> on s'arrete 
// faux --> on continue



// if(contenuStorage[i].idProduit == produit.idProduit) { 
//     console.log("meme id");
//     contenuStorage[i].quantiteProduit += produit.quantiteProduit;
//     console.log(contenuStorage[i].quantiteProduit);
//     localStorage.setItem("produit", JSON.stringify(contenuStorage));
//     console.log("contenuStorage : " + contenuStorage);
//     contenuStorage = JSON.parse(localStorage.getItem("produit"));
//     trouve = true;
// }
// if ( & 
//     contenuStorage[i].idProduit == produit.idProduit) { // même id
//     // On incrémente la quantité de contenuStorage 
//     // contenuStorage.quantiteproduit =+ produit.qantiteProduit
//     console.log("meme couleur");
//     console.log(contenuStorage[i]);
//     console.log(contenuStorage[i].quantiteProduit);
//     console.log(produit.quantiteProduit);
//     contenuStorage[i].quantiteProduit += produit.quantiteProduit;
//     console.log(contenuStorage[i].quantiteProduit);
//     localStorage.setItem("produit", JSON.stringify(contenuStorage));
//     console.log("contenuStorage : " + contenuStorage);
//     contenuStorage = JSON.parse(localStorage.getItem("produit"));
//     trouve = true;
//     console.log(trouve);
// } else { // couleur différente
//     console.log("Pas le meme id ou pas la meme couleur");
//     console.log(contenuStorage);
//     contenuStorage.push(produit);
//     localStorage.setItem("produit", JSON.stringify(contenuStorage));
//     contenuStorage = JSON.parse(localStorage.getItem("produit"));
//     console.log("contenuStorage : " + contenuStorage);
//     contenuStorage = JSON.parse(localStorage.getItem("produit"));
//     trouve = true;
// }








// function set(contenu) {
//     localStorage.setItem("produit",JSON.stringify(contenu));
// }

// function get() {
//     console.log(produit);
//     console.log(produit.idProduit);
//     let contenuLocalStorage = localStorage.getItem("produit");
//     if (contenuLocalStorage == null) {
//         console.log("if");
//         return [];
//     } else {
//         console.log("else");
//         return JSON.parse(contenuLocalStorage);
//     }
// }

// function ajouterAuPanier(produit) {
//     let contenuLocalStorage = get();
//     console.log(contenuLocalStorage);
//     for (let i=0 ; i < contenuLocalStorage.length; i++) {
//         if( contenuLocalStorage[i].idProduit != produit.idProduit) {
//             console.log("id different")
//             contenuLocalStorage.push(produit);
//             set(contenuLocalStorage);
//         } else if (contenuLocalStorage[i].idProduit == produit.idProduit) {
//             console.log("meme id")
//             if(contenuLocalStorage[i].couleurProduit != produit.couleurProduit) {
//                 console.log("meme id mais couleur differente")
//                 contenuLocalStorage.push(produit);
//                 set(contenuLocalStorage);
//             } else {
//                 console.log("meme id, meme couleur")
//                 contenuLocalStorage[i].quantiteProduit += produit.quantiteProduit
//             }
//         } 
//     }
// }


