let cart = [];

function addToCart(id) {
  const p = items.find(x => x.id === id);
  cart.push(p);
  updateCart();
}

function updateCart() {
  let total = 0;
  document.getElementById("cart-list").innerHTML =
    cart.map(i => {
      total += i.price;
      return `<div>${i.name} - ${i.price} DA</div>`;
    }).join("");
  document.getElementById("cart-total").innerText = total;
}

function toggleCart() {
  document.getElementById("cart-panel").classList.toggle("open");
}

function checkout() {
  const name = c-name.value;
  const phone = c-phone.value;
  if (!name || !phone || cart.length === 0)
    return alert("Fill all fields");

  db.ref("orders").push({
    name,
    phone,
    items: cart,
    total: document.getElementById("cart-total").innerText,
    status: "pending",
    time: Date.now()
  });

  alert("Order received! We will call you.");
  cart = [];
  updateCart();
}