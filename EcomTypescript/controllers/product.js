document.addEventListener("DOMContentLoaded", function () {
    var productsContainer = document.getElementById("products-container");
    var categoryTitle = document.getElementById("category-title");
    var categoryName = localStorage.getItem("catName");
    console.log(categoryName);
    var loadProducts = function () {
        if (categoryName) {
            categoryTitle.textContent = "".concat(categoryName.charAt(0).toUpperCase() + categoryName.slice(1));
            axios
                .get("https://fakestoreapi.com/products/category/".concat(categoryName))
                .then(function (response) {
                alert("Response Code:" + response.status);
                var products = response.data;
                products.forEach(function (product) {
                    createProductCard(product);
                });
            })
                .catch(function (error) {
                console.error("Error fetching products:", error);
            });
        }
        else {
            axios
                .get("https://fakestoreapi.com/products/")
                .then(function (response) {
                alert("Response Code:" + response.status);
                response.data.forEach(function (product) {
                    createProductCard(product);
                });
            })
                .catch(function (error) {
                console.error("Error fetching products:", error);
            });
        }
    };
    var createProductCard = function (product) {
        var card = document.createElement("div");
        card.className = "product-card";
        card.innerHTML = "\n            <img src=\"".concat(product.image, "\" alt=\"").concat(product.title, "\">\n            <h3>").concat(product.title, "</h3>\n            <p>").concat(product.description.slice(0, 100), "...</p>\n            <span class=\"price\">$").concat(product.price, "</span>\n            <button onclick=\"addToCart(").concat(product.id, ")\">Add to Cart</button>\n        ");
        card.addEventListener("click", function () {
            window.location.href = "productDetails.html?id=".concat(product.id);
        });
        productsContainer.appendChild(card);
    };
    loadProducts();
});
function addToCart(productId) {
    console.log("Product ".concat(productId, " added to cart"));
}
