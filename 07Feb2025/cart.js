document.addEventListener("DOMContentLoaded", () => {
  const cartContainer = document.getElementById("cart-container");
  const cartTotal = document.getElementById("cart-total");
  let totalAmount = 0;

  const loadCart = async () => {
    try {
      // Get cart items
      const cartResponse = await axios.get(
        "https://fakestoreapi.com/carts?userId=1"
      );
      const cart = cartResponse.data[0]; // Get the first cart

      // Create a container for cart items
      const cartItemsContainer = document.createElement("div");
      cartItemsContainer.className = "cart-items";

      // Process each product in the cart
      for (const item of cart.products) {
        // Fetch product details for each cart item
        const productResponse = await axios.get(
          `https://fakestoreapi.com/products/${item.productId}`
        );
        const product = productResponse.data;

        // Calculate item total
        const itemTotal = product.price * item.quantity;
        totalAmount += itemTotal;

        // Create cart item element
        const cartItem = document.createElement("div");
        cartItem.className = "cart-item";
        cartItem.innerHTML = `
                    <div class="cart-item-image">
                        <img src="${product.image}" alt="${product.title}">
                    </div>
                    <div class="cart-item-details">
                        <h3>${product.title}</h3>
                        <p class="price">$${product.price}</p>
                        <div class="quantity-controls">
                            <button onclick="updateQuantity(${
                              item.productId
                            }, ${item.quantity - 1})">-</button>
                            <span>${item.quantity}</span>
                            <button onclick="updateQuantity(${
                              item.productId
                            }, ${item.quantity + 1})">+</button>
                        </div>
                        <p class="item-total">Total: $${itemTotal.toFixed(
                          2
                        )}</p>
                        <button class="remove-btn" onclick="removeFromCart(${
                          item.productId
                        })">Remove</button>
                    </div>
                `;
        cartItemsContainer.appendChild(cartItem);
      }

      // Update the DOM
      cartContainer.innerHTML = "";
      cartContainer.appendChild(cartItemsContainer);
      cartTotal.innerHTML = `<h3>Total Amount: $${totalAmount.toFixed(2)}</h3>`;
    } catch (error) {
      console.error("Error loading cart:", error);
      cartContainer.innerHTML =
        '<p class="error">Error loading cart. Please try again later.</p>';
    }
  };

  loadCart();
});
function checkOut() {
  Toastify({
    text: "Checkout Successfull!",
    duration: 3000,
    gravity: "top",
    position: "center",
    style: {
      background: "linear-gradient(to right, #00b09b,#96c93d)",
    },
  }).showToast();

  setTimeout(() => {
    window.location.href = "index.html";
  }, 3000);
}
