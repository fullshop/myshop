let items = [], curCat = "All";

db.ref("products").on("value", s => {
  items = s.val() ? Object.values(s.val()) : [];
  draw();
});

function draw() {
  const g = document.getElementById("grid");
  g.innerHTML = "";
  items.forEach(p => {
    g.innerHTML += `
      <div class="product">
        <img src="${p.imgs[0]}" width="100%">
        <h4>${p.name}</h4>
        <b>${p.price} DA</b>
        <button onclick="addToCart(${p.id})">Add</button>
      </div>`;
  });
}

function toggleTheme() {
  document.body.dataset.theme =
    document.body.dataset.theme === "dark" ? "light" : "dark";
}