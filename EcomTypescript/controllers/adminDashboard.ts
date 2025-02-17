interface IProduct{
    id: number;
    image: string;
    title: string;
    description: string;
    price: number;
}
document.addEventListener("DOMContentLoaded", () => {
  const productContainer:HTMLElement = document.getElementById("product-container") as HTMLElement;

  const loadProducts = async () => {
    try {
      const response:any = await axios.get("https://fakestoreapi.com/products");
      displayProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const displayProducts = (products: Array<IProduct>): void => {
    productContainer.innerHTML = "";
    products.forEach((product) => {
      const productCard = document.createElement("div");
      productCard.className = "product-card";
      productCard.setAttribute("data-id", product.id.toString());
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

  const deleteProduct = async (productId: number) => {
    try {
      await axios.delete(`https://fakestoreapi.com/products/${productId}`);
      alert("Deleted Successfully!");
      const productCard = document.querySelector(
        `.product-card[data-id="${productId}"]`
      ) as HTMLElement;
      if (productCard) {
        productCard.remove();
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  document.getElementById("add-product-btn")?.addEventListener("click", () => {
    window.location.href = "editProduct.html";
  });

  loadProducts();
});
