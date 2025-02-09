document
  .getElementById("login-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (email === "admin@gmail.com" && password === "admin") {
      window.location.href = "adminDashboard.html";
    } else {
      document.getElementById("login-message").innerText =
        "Invalid email or password.";
    }
  });
