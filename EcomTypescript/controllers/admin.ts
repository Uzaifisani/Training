const loginForm = document.getElementById("login-form");
if (loginForm) {
  loginForm.addEventListener("submit", function (event: Event) {
    event.preventDefault();

    const email: string = (document.getElementById("email") as HTMLInputElement).value;
    const password: string = (document.getElementById("password") as HTMLInputElement).value;

    if (email === "admin@gmail.com" && password === "admin") {
      window.location.href = "adminDashboard.html";
    } else {
      document.getElementById("login-message")!.innerText = "Invalid email or password.";
    }
  });
}
