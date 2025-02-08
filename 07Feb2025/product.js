document.addEventListener("DOMContentLoaded", () => {
  const productsContainer = document.getElementById("products-container");
  const categoryTitle = document.getElementById("category-title");
  const categoryName = localStorage.getItem("catName");
  console.log(categoryName);

  const loadProducts = () => {
    if (categoryName) {
      categoryTitle.textContent = `${
        categoryName.charAt(0).toUpperCase() + categoryName.slice(1)
      }`;

      axios
        .get(`https://fakestoreapi.com/products/category/${categoryName}`)
        .then((response) => {
          response.data.forEach((product) => {
            createProductCard(product);
          });
        })
        .catch((error) => {
          console.error("Error fetching products:", error);
        });
    } else {
      axios
        .get(`https://fakestoreapi.com/products/`)
        .then((response) => {
          response.data.forEach((product) => {
            createProductCard(product);
          });
        })
        .catch((error) => {
          console.error("Error fetching products:", error);
        });
    }
  };

  const createProductCard = (product) => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p>${product.description.slice(0, 100)}...</p>
            <span class="price">$${product.price}</span>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
    // Add click event to the entire card
    card.addEventListener("click", () => {
      window.location.href = `productDetails.html?id=${product.id}`;
    });
    productsContainer.appendChild(card);
  };

  loadProducts();
});

function addToCart(productId) {
  // TODO: Implement cart functionality
  console.log(`Product ${productId} added to cart`);
}
