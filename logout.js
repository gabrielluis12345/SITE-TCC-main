// ===== LOGOUT (produtos.html) =====
const logoutBtn = document.getElementById("logoutBtn");
if (localStorage.getItem("isLoggedIn") === "true") {
  logoutBtn.style.display = "inline-block";
}

logoutBtn.addEventListener("click", function(e) {
  e.preventDefault();
  localStorage.removeItem("isLoggedIn");
  alert("Você saiu da sua conta.");
  window.location.href = "index.html";
});
