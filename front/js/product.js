/* -- Récupération de l'url de la page -- */

let urlOfThePage = window.location.href;
let url = new URL(urlOfThePage);
let id = url.searchParams.get("id"); // On isole l'id de l'adresse

const urlApi = "http://samuelgustin.fr:3001/api/kanap/products/" + id;

/* -- Fonctions -- */

// Affiche le nombre d'article sur les pages du site
function cartIcon(cart) {
  let cartNav = document.querySelectorAll("nav li")[1];
  if (cart == null || cart.length == 0) {
    cartNav.textContent = "Panier";
  }
  let items = 0;
  for (let i in cart) {
    items += cart[i].quantityProduct;
    let template = `Panier<span style="position: relative; bottom: 10px; left: 5px; color: #3498db;">${items}</span>`;
    cartNav.innerHTML = template;
  }
}

// Affiche un message à l'ajout d'un produit dans le panier
function messageAddToCart() {
  let productName = document.title;
  alert("Le produit " + productName + " a bien été ajouté dans le panier");
}

/* -- Requête pour récupérer sur l'API les données du produit à afficher sur la page -- */

async function displayProduct() {
  const request = await fetch(urlApi, {
    method: "GET",
  });
  if (!request.ok) {
    alert("Un problème est survenu !");
  } else {
    let product = await request.json();
    //console.log(product);

    // Ajout de l'image
    let img = document.createElement("img");
    img.setAttribute("src", product.imageUrl);
    img.setAttribute("alt", product.altTxt);
    document.querySelector(".item__img").appendChild(img);
    // Ajout du titre
    document.querySelector("#title").textContent = product.name;
    // Ajout du prix
    document.querySelector("#price").textContent = product.price;
    // Ajout de la description
    document.querySelector("#description").textContent = product.description;
    // Ajout des couleurs
    product.colors.forEach((color) => {
      let option = document.createElement("option");
      option.setAttribute("value", color);
      document.querySelector("#colors").appendChild(option).textContent = color;
    });
    document.title = product.name;
  }
}

displayProduct();

let cart = JSON.parse(localStorage.getItem("cart"));

cartIcon(cart);

/* -- Création du tableau avec le nouveau produit à ajouter dans le panier -- */

let newProduct = {
  idProduct: id,
  colorProduct: "",
  quantityProduct: 0,
};

newProduct["idProduct"] = id;

let colorInput = document.querySelector("#colors");

colorInput.addEventListener("change", function (e) {
  let color = e.target.value;
  newProduct["colorProduct"] = color;
});

let quantity = document.querySelector("#quantity");

quantity.addEventListener("input", function (e) {
  let quantityChoice = e.target.value;
  newProduct["quantityProduct"] = parseInt(quantityChoice);
});

/* -- Ajouter un produit dans le panier -- */

let linkAddToCart = document.querySelector("#addToCart");

linkAddToCart.addEventListener("click", () => {
  // On vérifie que la couleur est saisie par l'utilisateur
  if (newProduct.colorProduct == "") {
    alert("Merci de saisir une couleur");
    return;
  }
  // On vérifie que la quantité saisie par l'utilisateur
  if (newProduct.quantityProduct <= 0 || newProduct.quantityProduct > 100) {
    alert("La quantité doit être comprise entre 1 et 100");
    return;
  }
  // On lit le contenu du Panier dans la local storage
  let cart = JSON.parse(localStorage.getItem("cart"));

  if (cart == null) {
    cart = []; // On crée un tableau vide si le contenu est vide = pas de panier
  }

  if (cart.length == 0) {
    // On ajoute le produit au panier si panier vide
    //console.log("rien dans le panier");
    messageAddToCart();
    cart.push(newProduct);
    localStorage.setItem("cart", JSON.stringify(cart));
    cartIcon(cart);
  } else {
    //console.log("quelque chose dans le panier");
    messageAddToCart();
    // On cherche dans le panier un élément identique et on retourne son index
    const index = cart.findIndex(function (element) {
      return (
        element.idProduct == newProduct.idProduct &&
        element.colorProduct == newProduct.colorProduct
      );
    });

    if (index == -1) {
      // Lorsqu'il n'y a pas d'élément identique
      cart.push(newProduct);
      localStorage.setItem("cart", JSON.stringify(cart));
      cartIcon(cart);
    } else {
      cart[index].quantityProduct += newProduct.quantityProduct;
      localStorage.setItem("cart", JSON.stringify(cart));
      cartIcon(cart);
    }
  }
});
