// ===== REGISTRO =====
document.getElementById("registerForm").addEventListener("submit", function(e) {
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
document.getElementById("loginForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const email = document.getElementById("loginEmail").value;
  const senha = document.getElementById("loginSenha").value;
  const msg = document.getElementById("loginMsg");

  const savedUser = JSON.parse(localStorage.getItem("user"));

  if (savedUser && email === savedUser.email && senha === savedUser.senha) {
    localStorage.setItem("isLoggedIn", "true");
    msg.style.color = "green";
    msg.textContent = "✅ Login realizado com sucesso!";
    setTimeout(() => {
      window.location.href = "menu.html";
    }, 1000);
  } else {
    msg.style.color = "red";
    msg.textContent = "❌ Email ou senha incorretos!";
  }
});

// ===== LOGOUT =====
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
