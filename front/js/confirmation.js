let urlDeLaPage = window.location.href;
let url = new URL(urlDeLaPage)
let orderId = url.searchParams.get("orderId");
//console.log(id);

let span = document.querySelector('#orderId');
span.textContent = orderId;
