function allProducts(): void {
  localStorage.setItem("catName", "");
  window.location.href = "products.html";
}

document.addEventListener("DOMContentLoaded", () => {
  const categoryAPI: string = "https://fakestoreapi.com/products/categories";

  const category_grid: HTMLElement | null = document.querySelector(".category-grid");
  const LoadCategory = (): void => {
    axios
      .get<string[]>(categoryAPI)
      .then((res) => {
        alert("Response Status :" + res.status);
        res.data.forEach((element: string) => {
          CreateCatgory(element);
        });
      })
      .catch((err: Error) => {
        console.error(err);
      });
  };
  LoadCategory();

  const CreateCatgory = (Cname: string): void => {
    const div: HTMLDivElement = document.createElement("div");
    div.className = "category";
    div.innerHTML = `<h1>${Cname}</h1>`;
    div.addEventListener("click", () => {
      localStorage.setItem("catName", Cname);
      window.location.href = "products.html";
    });
    if (category_grid) {
      category_grid.appendChild(div);
    }
  };
});

document.getElementById("hamburger")?.addEventListener("click", () => {
  const navLinks: HTMLElement | null = document.getElementById("nav-links");
  if (navLinks) {
    navLinks.classList.toggle("active");
  }
});
