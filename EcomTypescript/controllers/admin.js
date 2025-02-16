var loginForm = document.getElementById("login-form");
if (loginForm) {
  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    if (email === "admin@gmail.com" && password === "admin") {
      window.location.href = "adminDashboard.html";
    } else {
      document.getElementById("login-message").innerText =
        "Invalid email or password.";
    }
  });
}
