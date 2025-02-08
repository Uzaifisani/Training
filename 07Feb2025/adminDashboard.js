document.addEventListener("DOMContentLoaded", () => {
  const productContainer = document.getElementById("product-container");

  const loadProducts = async () => {
    try {
      const response = await axios.get("https://fakestoreapi.com/products");
      displayProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const displayProducts = (products) => {
    productContainer.innerHTML = "";
    products.forEach((product) => {
      const productCard = document.createElement("div");
      productCard.className = "product-card";
      productCard.innerHTML = `
                <img src="${product.image}" alt="${product.title}">
                <h3>${product.title}</h3>
                <p>${product.description}</p>
                <span class="price">$${product.price}</span>
                <button onclick="deleteProduct(${product.id})">Delete</button>
            `;
      productContainer.appendChild(productCard);
    });
  };

  window.deleteProduct = async (productId) => {
    try {
      await axios.delete(`https://fakestoreapi.com/products/${productId}`);
      loadProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  document.getElementById("add-product-btn").addEventListener("click", () => {
    window.location.href = "editProduct.html";
  });

  loadProducts();
});
