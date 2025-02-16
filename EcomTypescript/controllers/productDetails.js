document.addEventListener("DOMContentLoaded", function () {
    var productContainer = document.getElementById("product-container");
    var loadProductDetails = function () {
        var urlParams = new URLSearchParams(window.location.search);
        var productId = urlParams.get("id");
        if (productId) {
            axios
                .get("https://fakestoreapi.com/products/".concat(productId))
                .then(function (response) {
                displayProductDetails(response.data);
            })
                .catch(function (error) {
                console.error("Error fetching product details:", error);
            });
        }
    };
    var displayProductDetails = function (product) {
        productContainer.innerHTML = "\n            <div class=\"product-detail-container\">\n                <div class=\"product-image\">\n                    <img src=\"".concat(product.image, "\" alt=\"").concat(product.title, "\">\n                </div>\n                <div class=\"product-info\">\n                    <h1>").concat(product.title, "</h1>\n                    <p class=\"description\">").concat(product.description, "</p>\n                    <div class=\"price\">$").concat(product.price, "</div>\n                    <div class=\"category\">Category: ").concat(product.category, "</div>\n                    <button onclick=\"addToCart(").concat(product.id, ")\" class=\"add-to-cart\">Add to Cart</button>\n                </div>\n            </div>\n        ");
    };
    loadProductDetails();
});
function addToCart(productId) {
    alert("Product Add to Cart with Product ID: ".concat(productId));
}
