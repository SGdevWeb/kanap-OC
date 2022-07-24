// On récupère l'url de la page
let urlDeLaPage = window.location.href;
let url = new URL(urlDeLaPage);
let id = url.searchParams.get("id"); // On isole l'id de l'adresse

const urlApi = 'http://localhost:3000/api/products';

async function recupererproduit() {
    const requete = await fetch(urlApi, {
        method: 'GET'
    });
    if(!requete.ok) {
        alert('Un problème est survenu !');
    } else {
        let donnees = await requete.json();
        //console.log(donnees[0]);
        for (let i = 0; i < donnees.length; i++) {
            
            if (donnees[i]._id === id) {
                
                // Ajout de l'image
                let img = document.createElement('img');
                img.setAttribute('src', donnees[i].imageUrl);
                img.setAttribute('alt', donnees[i].altTxt);
                document.querySelector('.item__img').appendChild(img);
                // Ajout du titre
                document.querySelector('#title').textContent = donnees[i].name;
                //Ajout du prix
                document.querySelector('#price').textContent = donnees[i].price;
                //Ajout de la description
                document.querySelector('#description').textContent = donnees[i].description;
                //ajout des couleurs
                donnees[i].colors.forEach(colors => {
                    let option = document.createElement('option');
                    option.setAttribute('value', colors)
                    document.querySelector('#colors').appendChild(option).textContent = colors;
                });
                
            } else {
                console.log("pas le bon id");
            }
        }
    }
}

recupererproduit();