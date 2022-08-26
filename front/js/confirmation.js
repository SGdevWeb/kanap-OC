/* -- Affichage du numéro de commande -- */

// On récupére le numéro de commande dans l'url
let urlOfThePage = window.location.href;
let url = new URL(urlOfThePage);
let orderId = url.searchParams.get("orderId");

// On affiche le numéro de commande
let span = document.querySelector('#orderId');
span.textContent = orderId;

// On vide le panier = localStorage
localStorage.setItem("cart", '[]');