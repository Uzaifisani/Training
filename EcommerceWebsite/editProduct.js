document.addEventListener("DOMContentLoaded", () => {
  const productForm = document.getElementById("product-form");
  const messageDiv = document.getElementById("message");

  productForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const price = document.getElementById("price").value;
    const category = document.getElementById("category").value;
    const image = document.getElementById("image").value;

    const productData = {
      title,
      description,
      price: parseFloat(price),
      category,
      image,
    };

    try {
      await axios.post("https://fakestoreapi.com/products", productData);
      messageDiv.innerText = "Product added successfully!";
      productForm.reset();
    } catch (error) {
      console.error("Error saving product:", error);
      messageDiv.innerText = "Error saving product. Please try again.";
    }
  });
});
