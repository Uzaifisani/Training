interface Product {
  id: number;
  title: string;
  description: string;
  image: string;
  price: number;
}
document.addEventListener("DOMContentLoaded", () => {
  const productsContainer = document.getElementById("products-container") as HTMLElement;
  const categoryTitle = document.getElementById("category-title") as HTMLElement;
  const categoryName: string | null = localStorage.getItem("catName");
  console.log(categoryName);

  const loadProducts = () => {
    if (categoryName) {
      categoryTitle.textContent = `${
        categoryName.charAt(0).toUpperCase() + categoryName.slice(1)
      }`;

      axios
          .get(`https://fakestoreapi.com/products/category/${categoryName}`)
          .then((response) => {
              alert("Response Code:" + response.status);
              const products: Product[] = response.data as Product[];
              products.forEach((product: Product) => {
                createProductCard(product);
              });
          })
        .catch((error: any) => {
          console.error("Error fetching products:", error);
        });
    } else {
      axios
        .get<Product[]>(`https://fakestoreapi.com/products/`)
        .then((response) => {
          alert("Response Code:" + response.status);
          response.data.forEach((product: Product) => {
            createProductCard(product);
          });
        })
        .catch((error: any) => {
          console.error("Error fetching products:", error);
        });
    }
  };

  const createProductCard = (product: Product) => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p>${product.description.slice(0, 100)}...</p>
            <span class="price">$${product.price}</span>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
    card.addEventListener("click", () => {
      window.location.href = `productDetails.html?id=${product.id}`;
    });
    productsContainer.appendChild(card);
  };

  loadProducts();
});




const addToCart = (productId: number) => {
  console.log(`Product ${productId} added to cart`);
};
