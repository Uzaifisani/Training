function allProducts() {
  localStorage.setItem("catName", "");
  window.location.href = "products.html";
}

document.addEventListener("DOMContentLoaded", () => {
  const categoryAPI = "https://fakestoreapi.com/products/categories";

  const category_grid = document.querySelector(".category-grid");
  const LoadCategory = () => {
    axios
      .get(categoryAPI)
      .then((res) => {
        alert("Response Status :" + res.status);
        res.data.forEach((element) => {
          CreateCatgory(element);
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };
  LoadCategory();

  const CreateCatgory = (Cname) => {
    const div = document.createElement("div");
    div.className = "category";
    div.innerHTML = `<h1>${Cname}</h1>`;
    div.addEventListener("click", () => {
      localStorage.setItem("catName", Cname);
      window.location.href = "products.html";
    });
    category_grid.appendChild(div);
  };
});

document.getElementById("hamburger").addEventListener("click", () => {
  const navLinks = document.getElementById("nav-links");
  navLinks.classList.toggle("active");
});
