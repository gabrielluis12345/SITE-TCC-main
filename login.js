// ===== REGISTRO =====
document.getElementById("registerForm")?.addEventListener("submit", function(e) {
  e.preventDefault();

  const nome = document.getElementById("regNome").value;
  const email = document.getElementById("regEmail").value;
  const senha = document.getElementById("regSenha").value;

  const user = { nome, email, senha };

  localStorage.setItem("user", JSON.stringify(user));

  document.getElementById("registerMsg").style.color = "green";
  document.getElementById("registerMsg").textContent = "✅ Cadastro realizado com sucesso! Agora faça login.";
  this.reset();
});

// ===== LOGIN =====
document.getElementById("loginForm")?.addEventListener("submit", function(e) {
  e.preventDefault();

  const nome = document.getElementById("loginNome").value;
  const senha = document.getElementById("loginSenha").value;
  const msg = document.getElementById("loginMsg");

  const savedUser = JSON.parse(localStorage.getItem("user"));

  if (savedUser && nome === savedUser.nome && senha === savedUser.senha) {
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("currentUser", savedUser.nome); // salva o nome do usuário logado

    msg.style.color = "green";
    msg.textContent = "✅ Login realizado com sucesso!";
    setTimeout(() => {
      window.location.href = "menu.html"; // redireciona
    }, 1000);
  } else {
    msg.style.color = "red";
    msg.textContent = "❌ Nome ou senha incorretos!";
  }
});

// ===== MOSTRAR USUÁRIO LOGADO + LOGOUT (funciona em qualquer página) =====
const logoutBtn = document.getElementById("logoutBtn");
const userInfo = document.getElementById("userInfo");

if (userInfo) {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const currentUser = localStorage.getItem("currentUser");

  if (isLoggedIn && currentUser) {
    userInfo.textContent = currentUser; // mostra o nome do usuário
    if (logoutBtn) logoutBtn.style.display = "inline-block"; // mostra botão logout
  } else {
    userInfo.textContent = "LOGIN"; // mostra LOGIN se não estiver logado
    if (logoutBtn) logoutBtn.style.display = "none"; // esconde logout
  }
}

// ===== LOGOUT =====
logoutBtn?.addEventListener("click", function(e) {
  e.preventDefault();
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("currentUser");
  alert("Você saiu da sua conta.");
  window.location.href = "index.html";
});
