// Simple front-end login (demo only, not secure)
document.addEventListener("DOMContentLoaded", () => {
  const loginBtn = document.getElementById("loginBtn");

  loginBtn.addEventListener("click", login);
});

function login() {
  const emailInput = document.getElementById("email").value.trim();
  const passwordInput = document.getElementById("password").value.trim();

  // Demo credentials
  const validEmail = "r@gmail.com";
  const validPassword = "12345";

  if (emailInput === validEmail && passwordInput === validPassword) {
    // Redirect to home page (index.html)
    window.location.href = "home.html";
  } else {
    alert("Invalid email or password. Try:\nEmail: user@example.com\nPassword: 123456");
  }
}
