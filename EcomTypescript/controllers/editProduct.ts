document.addEventListener("DOMContentLoaded", () => {
    const productForm:HTMLElement = document.getElementById("product-form") as HTMLFormElement;
    const messageDiv:HTMLElement = document.getElementById("message") as HTMLDivElement;

    if (productForm) {
        productForm.addEventListener("submit", async (event) => {
            event.preventDefault();

            const titleInput = document.getElementById("title") as HTMLInputElement;
            const descriptionInput = document.getElementById("description") as HTMLInputElement;

            const title = titleInput.value;
            const description = descriptionInput.value;
            const priceInput = document.getElementById("price") as HTMLInputElement;
            const price = priceInput.value;
            const categoryInput = document.getElementById("category") as HTMLInputElement;
            const category = categoryInput.value;
            const imageInput = document.getElementById("image") as HTMLInputElement;
            const image = imageInput.value;

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
                if (productForm instanceof HTMLFormElement) {
                    productForm.reset();
                }
            } catch (error) {
                console.error("Error saving product:", error);
                messageDiv.innerText = "Error saving product. Please try again.";
            }
        });
    }
});
