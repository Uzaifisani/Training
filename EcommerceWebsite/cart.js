window.cart = {
  products: [],
};

document.addEventListener("DOMContentLoaded", () => {
  const cartContainer = document.getElementById("cart-container");
  const cartTotal = document.getElementById("cart-total");
  let totalAmount = 0;

  const loadCart = async () => {
    try {
      const cartResponse = await axios.get(
        "https://fakestoreapi.com/carts?userId=1"
      );
      const cart = cartResponse.data[0];
      alert("Response Status:" + cartResponse.status);
      const cartItemsContainer = document.createElement("div");
      cartItemsContainer.className = "cart-items";

      for (const item of cart.products) {
        const productResponse = await axios.get(
          `https://fakestoreapi.com/products/${item.productId}`
        );
        const product = productResponse.data;
        totalAmount += product.price * item.quantity;
        const cartItem = createCartItem(product, item);
        cartItemsContainer.appendChild(cartItem);
      }
      cartContainer.innerHTML = "";
      cartContainer.appendChild(cartItemsContainer);
      cartTotal.innerHTML = `<h3>Total Amount: $${totalAmount.toFixed(2)}</h3>`;
    } catch (error) {
      console.error("Error loading cart:", error);
      cartContainer.innerHTML =
        '<p class="error">Error loading cart. Please try again later.</p>';
    }
  };
  const createCartItem = (product, item) => {
    const itemTotal = product.price * item.quantity;
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
                        }, this)">Remove</button>
                    </div>
                `;
    return cartItem;
  };
  window.removeFromCart = (productId, button) => {
    window.cart.products = window.cart.products.filter(
      (item) => item.productId !== productId
    );
    const cartItem = button.closest(".cart-item");
    if (cartItem) {
      cartItem.remove();
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
}
