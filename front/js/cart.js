/* -- On récupère le panier dans le localstorage -- */

let cart = JSON.parse(localStorage.getItem("cart"));

// On copie le localStorage dans un panier en attente
let virtualCart = JSON.parse(localStorage.getItem("cart"));

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

cartIcon(cart);

// Met à jour le total des articles et du prix sur la page
function totalCart(cart) {
  let price = 0;
  let items = 0;
  for (let i in cart) {
    price += cart[i].price * cart[i].quantityProduct;
    items += cart[i].quantityProduct;
  }
  let totalItems = document.querySelector("#totalQuantity");
  let totalPrice = document.querySelector("#totalPrice");
  totalItems.textContent = items;
  totalPrice.textContent = price;
}

// Affiche "panier vide" sur la page
function emptyCart() {
  if (document.querySelector(".cart__item") == null) {
    document.querySelector("#cartAndFormContainer h1").textContent =
      "Panier vide";
  } else {
    document.querySelector("#cartAndFormContainer h1").textContent =
      "Votre panier";
  }
}

/* -- Affichage du panier sur la page -- */

emptyCart();

const displayCart = () => {
  for (let i in cart) {
    fetch("http://samuelgustin.fr:3002/api/kanap/products/" + cart[i].idProduct)
      .then((response) => response.json())
      .then((product) => {
        /* --Remplissage du tableau récapitulatif-- */

        virtualCart[i].price = product.price; // On ajoute le prix au panier virtuel

        let items = document.querySelector("#cart__items");

        let template = `
                            <article class="cart__item" data-id="${cart[i].idProduct}" data-color="${cart[i].colorProduct}">
                                <div class="cart__item__img">
                                    <img src="${product.imageUrl}" alt="${product.altTxt}">
                                </div>
                                <div class="cart__item__content">
                                    <div class="cart__item__content__description">
                                        <h2>${product.name}</h2>
                                        <p>${cart[i].colorProduct}</p>
                                        <p>${product.price} €</p>
                                    </div>
                                    <div class="cart__item__content__settings">
                                        <div class="cart__item__content__settings__quantity">
                                        <p>Qté : </p>
                                        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${cart[i].quantityProduct}">
                                        </div>
                                        <div class="cart__item__content__settings__delete">
                                            <p class="deleteItem">Supprimer</p>
                                        </div>
                                    </div>
                                </div>
                            </article>`;

        items.innerHTML += template;

        totalCart(virtualCart);
        emptyCart();

        /* --Modification du panier--*/

        let inputs = document.querySelectorAll(".itemQuantity");

        inputs.forEach((input) => {
          input.addEventListener("change", (e) => {
            cart = JSON.parse(localStorage.getItem("cart"));
            let newQuantity = e.target.value;
            if (newQuantity <= 0 || newQuantity > 100) {
              alert("La quantité doit être comprise entre 1 et 100");
              return;
            }
            let cartItem = e.target.closest(".cart__item");
            cart.forEach((product) => {
              if (
                (product.idProduct == cartItem.dataset.id) &
                (product.colorProduct == cartItem.dataset.color)
              ) {
                product.quantityProduct = parseInt(newQuantity);
              }
            });
            localStorage.setItem("cart", JSON.stringify(cart));
            virtualCart.forEach((product) => {
              if (
                (product.idProduct == cartItem.dataset.id) &
                (product.colorProduct == cartItem.dataset.color)
              ) {
                product.quantityProduct = parseInt(newQuantity);
              }
            });
            totalCart(virtualCart);
            cartIcon(virtualCart);
          });
        });

        /* ——Suppression produit—— */

        let deleteButton = document.querySelectorAll(".deleteItem");

        deleteButton.forEach((element) => {
          element.addEventListener("click", (e) => {
            if (
              confirm(
                "Etes-vous sûr de vouloir supprimer ce produit de votre panier ?"
              )
            ) {
              cart = JSON.parse(localStorage.getItem("cart"));
              let cartItem = e.target.closest(".cart__item");
              cart = cart.filter(function (product) {
                return (
                  product.idProduct + product.colorProduct !==
                  cartItem.dataset.id + cartItem.dataset.color
                );
              });
              virtualCart = virtualCart.filter(function (product) {
                return (
                  product.idProduct + product.colorProduct !==
                  cartItem.dataset.id + cartItem.dataset.color
                );
              });
              localStorage.setItem("cart", JSON.stringify(cart));
              cartItem.remove();
              emptyCart();
              alert("Produit supprimé du panier");
              totalCart(virtualCart);
              cartIcon(virtualCart);
            }
          });
        });
      });
  }
};

displayCart();

/* --  Gestion du formulaire -- */

// Récupération du formulaire saisie par l'utilisateur

let contact = {
  firstName: "",
  lastName: "",
  address: "",
  city: "",
  email: "",
};

let firstName = document.querySelector("#firstName");
let lastName = document.querySelector("#lastName");
let address = document.querySelector("#address");
let city = document.querySelector("#city");
let email = document.querySelector("#email");

let firstNameMessage = document.getElementById("firstNameErrorMsg");
let lastNameMessage = document.getElementById("lastNameErrorMsg");
let addressMessage = document.getElementById("addressErrorMsg");
let cityMessage = document.getElementById("cityErrorMsg");
let emailMessage = document.getElementById("emailErrorMsg");

function validationEmail(valueInput) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(valueInput)) {
    return true;
  } else {
    return false;
  }
}

function validationText(valueInput) {
  if (/^[a-zA-Z-]{2,20}$/.test(valueInput)) {
    return true;
  } else {
    return false;
  }
}

function validationAdress(valueInput) {
  if (/^[a-zA-Z0-9\s,.'-]{3,}$/.test(valueInput)) {
    return true;
  } else {
    return false;
  }
}

firstName.addEventListener("input", (e) => {
  let valueInput = e.target.value;
  if (validationText(valueInput)) {
    firstNameMessage.textContent = "";
  } else {
    firstNameMessage.textContent =
      "Le prénom doit contenir uniquement des lettres entre 2 et 20 caractères";
  }
  contact.firstName = valueInput;
});

lastName.addEventListener("input", (e) => {
  let valueInput = e.target.value;
  if (validationText(valueInput)) {
    lastNameMessage.textContent = "";
  } else {
    lastNameMessage.textContent =
      "Le nom doit contenir uniquement des lettres entre 2 et 20 caractères";
  }
  contact.lastName = valueInput;
});

address.addEventListener("input", (e) => {
  let valueInput = e.target.value;
  if (validationAdress(valueInput)) {
    addressMessage.textContent = "";
  } else {
    addressMessage.textContent =
      "L'adresse doit contenir entre 3 et 60 caractères, sans caractères spéciaux";
  }
  contact.address = valueInput;
});

city.addEventListener("input", (e) => {
  let valueInput = e.target.value;
  if (validationText(valueInput)) {
    cityMessage.textContent = "";
  } else {
    cityMessage.textContent =
      "La ville doit contenir uniquement des lettres entre 2 et 20 caractères";
  }
  contact.city = valueInput;
});

email.addEventListener("input", (e) => {
  let valueInput = e.target.value;
  contact.email = valueInput;
  validationEmail(valueInput);
  if (validationEmail(valueInput)) {
    emailMessage.textContent = "";
  } else {
    emailMessage.textContent = "Merci de saisir une adresse mail valide";
  }
  contact.email = valueInput;
});

// Récupération des produits dans le panier pour passer la commande

let products = [];

for (let i in cart) {
  products.push(cart[i].idProduct);
}

/* -- Envoi du formulaire --*/

let orderButton = document.querySelector("#order");

orderButton.addEventListener("click", (e) => {
  e.preventDefault();
  //let formulaire = document.querySelector('.cart__order__form');
  //formulaire.setAttribute('method', 'post');
  if (document.querySelector(".cart__item") == null) {
    alert("Votre panier est vide");
  } else {
    if (
      (firstNameMessage.textContent == "") &
      (lastNameMessage.textContent == "") &
      (addressMessage.textContent == "") &
      (cityMessage.textContent == "") &
      (emailMessage.textContent == "") &
      (contact.firstName != "") &
      (contact.lastName != "") &
      (contact.address != "") &
      (contact.city != "") &
      (contact.email != "")
    ) {
      // console.log(JSON.stringify({ contact, products }));

      fetch("http://samuelgustin.fr:3002/api/kanap/products/order", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ contact, products }),
      })
        .then((response) => response.json())
        .then((data) => {
          //console.log(data);
          let orderId = data.orderId;
          //console.log(orderId);
          window.location = "confirmation.html?orderId=" + orderId;
        });
    } else {
      alert("Un champ du formulaire n'est pas valide");
    }
  }
});
