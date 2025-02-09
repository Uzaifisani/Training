document.addEventListener("DOMContentLoaded", () => {
  const productContainer = document.getElementById("product-container");

  const loadProductDetails = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("id");

    if (productId) {
      axios
        .get(`https://fakestoreapi.com/products/${productId}`)
        .then((response) => {
          displayProductDetails(response.data);
        })
        .catch((error) => {
          console.error("Error fetching product details:", error);
        });
    }
  };

  const displayProductDetails = (product) => {
    productContainer.innerHTML = `
            <div class="product-detail-container">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.title}">
                </div>
                <div class="product-info">
                    <h1>${product.title}</h1>
                    <p class="description">${product.description}</p>
                    <div class="price">$${product.price}</div>
                    <div class="category">Category: ${product.category}</div>
                    <button onclick="addToCart(${product.id})" class="add-to-cart">Add to Cart</button>
                </div>
            </div>
        `;
  };

  loadProductDetails();
});

function addToCart(productId) {
  alert("Product Add to Cart with Product ID:", productId);
}
