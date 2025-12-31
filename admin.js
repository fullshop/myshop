let isAdmin = false;

document.getElementById("admin-trigger").onclick = () => {
  const email = prompt("Admin email:");
  const pass = prompt("Password:");
  auth.signInWithEmailAndPassword(email, pass)
    .catch(() => alert("Access denied"));
};

auth.onAuthStateChanged(async user => {
  if (!user) return;

  const snap = await db.ref("admins/" + user.uid).get();
  if (!snap.exists()) return auth.signOut();

  isAdmin = true;
  document.getElementById("admin-panel").style.display = "block";
  loadOrders();
});

function loadOrders() {
  db.ref("orders").on("value", snap => {
    const box = document.getElementById("orders");
    box.innerHTML = "";
    const data = snap.val();
    if (!data) return;

    Object.entries(data).reverse().forEach(([id, o]) => {
      box.innerHTML += `
        <div style="border:1px solid #ccc;padding:10px;margin-bottom:8px">
          <b>${o.name}</b> (${o.phone})<br>
          Total: ${o.total} DA<br>
          Status: ${o.status}<br>
          <button onclick="setStatus('${id}','confirmed')">Confirm</button>
          <button onclick="setStatus('${id}','delivered')">Delivered</button>
        </div>
      `;
    });
  });
}

function setStatus(id, status) {
  db.ref("orders/" + id + "/status").set(status);
}

function logout() {
  auth.signOut();
}
async function enableNotifications() {
  const perm = await Notification.requestPermission();
  if (perm !== "granted") return;

  const token = await messaging.getToken({
    vapidKey: "YOUR_VAPID_KEY"
  });

  db.ref("adminTokens/" + auth.currentUser.uid).set(token);
}

auth.onAuthStateChanged(user => {
  if (user) enableNotifications();
});