// Sempre checa o localStorage na hora do clique
const cartButtons = document.querySelectorAll(".add-to-cart");
const popup = document.getElementById("login-popup");
const closeBtn = document.querySelector(".close");

cartButtons.forEach(button => {
  button.addEventListener("click", function(event) {
    event.preventDefault();

    // ✅ pegar o login atualizado
    let isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    if (!isLoggedIn) {
      popup.style.display = "flex"; // mostra popup pedindo login
    } else {
      alert("✅ Produto adicionado ao carrinho!");
      // aqui você coloca a lógica real do carrinho
    }
  });
});

// Fechar popup
closeBtn.addEventListener("click", () => {
  popup.style.display = "none";
});

window.addEventListener("click", (event) => {
  if (event.target === popup) {
    popup.style.display = "none";
  }
});
