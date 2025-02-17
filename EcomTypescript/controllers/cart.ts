interface ICartProduct {
  productId: number;
  quantity: number;
}

interface IProduct {
  id: number;
  price: number;
  title: string;
  image: string;
}

interface ICart {
  products: ICartProduct[];
}

(window as any).cart = {
  products: [] as ICartProduct[],
} as ICart;

document.addEventListener("DOMContentLoaded", () => {
  const cartContainer:HTMLElement = document.getElementById("cart-container") as HTMLElement;
  const cartTotal:HTMLElement = document.getElementById("cart-total") as HTMLElement;
  let totalAmount: number = 0;

  const loadCart = async (): Promise<void> => {
    try {
      const cartResponse = await axios.get<{ products: ICartProduct[] }[]>(
        "https://fakestoreapi.com/carts?userId=1"
      );
      const cart = cartResponse.data[0];
      (window as any).cart.products = cart.products; 
      alert("Response Status: " + cartResponse.status);
      const cartItemsContainer = document.createElement("div");
      cartItemsContainer.className = "cart-items";

      for (const item of (window as any).cart.products) { 
        const productResponse = await axios.get<IProduct>(
          `https://fakestoreapi.com/products/${item.productId}`
        );
        const product = productResponse.data;
        totalAmount += product.price * item.quantity;
        const cartItem = createCartItem(product, item);
        cartItemsContainer.appendChild(cartItem);
      }

      cartContainer.appendChild(cartItemsContainer);
      cartTotal.textContent = `Total: $${totalAmount.toFixed(2)}`;
    } catch (error) {
      console.error("Error loading cart:", error);
    }
  };

  loadCart();
});

const createCartItem = (product: IProduct, item: ICartProduct): HTMLElement => {
  const itemTotal:number = product.price * item.quantity;
  const cartItem:HTMLElement= document.createElement("div");
  cartItem.className = "cart-item";
  cartItem.innerHTML = `
    <div class="cart-item-image">
      <img src="${product.image}" alt="${product.title}">
    </div>
    <div class="cart-item-details">
      <h3>${product.title}</h3>
      <p class="price">$${product.price}</p>
      <div class="quantity-controls">
        <button onclick="updateQuantity(${item.productId}, ${item.quantity - 1})">-</button>
        <span>${item.quantity}</span>
        <button onclick="updateQuantity(${item.productId}, ${item.quantity + 1})">+</button>
      </div>
      <p class="item-total">Total: $${itemTotal.toFixed(2)}</p>
      <button class="remove-btn" onclick="removeFromCart(${item.productId}, this)">Remove</button>
    </div>
  `;
  return cartItem;
};

const removeFromCart = (productId: number, button: HTMLElement): void => {
  (window as any).cart.products = (window as any).cart.products.filter(
    (item: ICartProduct) => item.productId !== productId
  );
  const cartItem:HTMLElement |null= button.closest(".cart-item");
  if (cartItem) {
    cartItem.remove();
  }
};

function checkOut(): void {
 alert("Checkout successful!");
}
