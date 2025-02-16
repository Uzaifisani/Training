var _a;
function allProducts() {
    localStorage.setItem("catName", "");
    window.location.href = "products.html";
}
document.addEventListener("DOMContentLoaded", function () {
    var categoryAPI = "https://fakestoreapi.com/products/categories";
    var category_grid = document.querySelector(".category-grid");
    var LoadCategory = function () {
        axios
            .get(categoryAPI)
            .then(function (res) {
            alert("Response Status :" + res.status);
            res.data.forEach(function (element) {
                CreateCatgory(element);
            });
        })
            .catch(function (err) {
            console.error(err);
        });
    };
    LoadCategory();
    var CreateCatgory = function (Cname) {
        var div = document.createElement("div");
        div.className = "category";
        div.innerHTML = "<h1>".concat(Cname, "</h1>");
        div.addEventListener("click", function () {
            localStorage.setItem("catName", Cname);
            window.location.href = "products.html";
        });
        if (category_grid) {
            category_grid.appendChild(div);
        }
    };
});
(_a = document.getElementById("hamburger")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () {
    var navLinks = document.getElementById("nav-links");
    if (navLinks) {
        navLinks.classList.toggle("active");
    }
});
