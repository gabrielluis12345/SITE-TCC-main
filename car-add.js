const cartButtons = document.querySelectorAll(".add-to-cart");
const popup = document.getElementById("login-popup");
const closeBtn = document.querySelector(".close");

// Evento de clique nos botões de carrinho
cartButtons.forEach(button => {
  button.addEventListener("click", function(event) {
    event.preventDefault();

    let isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    if (!isLoggedIn) {
      popup.style.display = "flex"; // mostra popup pedindo login
    } else {
      // Pega a div do produto
      const box = this.closest(".box");
      const nome = box.querySelector("h3").textContent;
      const precoTexto = box.querySelector(".price").childNodes[0].textContent.trim(); // R$ 5,99
      const preco = parseFloat(precoTexto.replace("R$", "").replace(",", "."));
      const imagem = box.querySelector("img").getAttribute("src");

      const produto = {
        nome,
        preco,
        imagem,
        quantidade: 1
      };

      // Pega o carrinho atual ou cria novo
      let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
      carrinho.push(produto);
      localStorage.setItem("carrinho", JSON.stringify(carrinho));

      // Redireciona para a página do carrinho
      window.location.href = "carrinho.html";
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
