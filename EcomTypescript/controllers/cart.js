var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
window.cart = {
    products: [],
};
document.addEventListener("DOMContentLoaded", function () {
    var cartContainer = document.getElementById("cart-container");
    var cartTotal = document.getElementById("cart-total");
    var totalAmount = 0;
    var loadCart = function () { return __awaiter(_this, void 0, void 0, function () {
        var cartResponse, cart, cartItemsContainer, _i, _a, item, productResponse, product, cartItem, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 6, , 7]);
                    return [4 /*yield*/, axios.get("https://fakestoreapi.com/carts?userId=1")];
                case 1:
                    cartResponse = _b.sent();
                    cart = cartResponse.data[0];
                    window.cart.products = cart.products; // Assign fetched products to global cart object
                    alert("Response Status: " + cartResponse.status);
                    cartItemsContainer = document.createElement("div");
                    cartItemsContainer.className = "cart-items";
                    _i = 0, _a = window.cart.products;
                    _b.label = 2;
                case 2:
                    if (!(_i < _a.length)) return [3 /*break*/, 5];
                    item = _a[_i];
                    return [4 /*yield*/, axios.get("https://fakestoreapi.com/products/".concat(item.productId))];
                case 3:
                    productResponse = _b.sent();
                    product = productResponse.data;
                    totalAmount += product.price * item.quantity;
                    cartItem = createCartItem(product, item);
                    cartItemsContainer.appendChild(cartItem);
                    _b.label = 4;
                case 4:
                    _i++;
                    return [3 /*break*/, 2];
                case 5:
                    cartContainer.appendChild(cartItemsContainer);
                    cartTotal.textContent = "Total: $".concat(totalAmount.toFixed(2));
                    return [3 /*break*/, 7];
                case 6:
                    error_1 = _b.sent();
                    console.error("Error loading cart:", error_1);
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    }); };
    loadCart();
});
var createCartItem = function (product, item) {
    var itemTotal = product.price * item.quantity;
    var cartItem = document.createElement("div");
    cartItem.className = "cart-item";
    cartItem.innerHTML = "\n    <div class=\"cart-item-image\">\n      <img src=\"".concat(product.image, "\" alt=\"").concat(product.title, "\">\n    </div>\n    <div class=\"cart-item-details\">\n      <h3>").concat(product.title, "</h3>\n      <p class=\"price\">$").concat(product.price, "</p>\n      <div class=\"quantity-controls\">\n        <button onclick=\"updateQuantity(").concat(item.productId, ", ").concat(item.quantity - 1, ")\">-</button>\n        <span>").concat(item.quantity, "</span>\n        <button onclick=\"updateQuantity(").concat(item.productId, ", ").concat(item.quantity + 1, ")\">+</button>\n      </div>\n      <p class=\"item-total\">Total: $").concat(itemTotal.toFixed(2), "</p>\n      <button class=\"remove-btn\" onclick=\"removeFromCart(").concat(item.productId, ", this)\">Remove</button>\n    </div>\n  ");
    return cartItem;
};
var removeFromCart = function (productId, button) {
    window.cart.products = window.cart.products.filter(function (item) { return item.productId !== productId; });
    var cartItem = button.closest(".cart-item");
    if (cartItem) {
        cartItem.remove();
    }
};
function checkOut() {
    alert("Checkout successful!");
}
