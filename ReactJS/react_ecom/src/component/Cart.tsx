import React, { useContext, useEffect, useState } from 'react'
import { ICartItem } from '../types'
import { GlobalContext } from '../context/GlobalContext';

const Cart = () => {
  const [cart, setCart] = useState<ICartItem[] | null>(null);
  const { state, dispatch } = useContext(GlobalContext);

  useEffect(() => {
    const cartItem: ICartItem[] = state.cart;
    setCart(cartItem);
  }, [state.cart])

  const handleRemoveFromCart = (productId: number) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: productId });
  }
  
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
      {cart?.length ? (
        cart.map((item, index) => (
          <div key={index} className="flex items-center bg-white shadow-md rounded-lg p-4 mb-4">
            <img src={item.product.image} alt={item.product.title} className="w-20 h-20 object-cover rounded-lg mr-4" />
            <div className="flex-1">
              <h2 className="text-xl font-semibold">{item.product.title}</h2>
              <p className="text-gray-600">{item.product.description}</p>
              <p className="text-green-600 font-semibold">${item.product.price}</p>
              <p className="text-gray-600">Quantity: {item.quantity}</p>
            </div>
            <button 
              onClick={() => handleRemoveFromCart(item.product.id)} 
              className="bg-red-500 hover:bg-red-600 text-white text-lg font-medium py-2 px-4 rounded-lg shadow-md transition duration-200"
            >
              Remove
            </button>
          </div>
        ))
      ) : (
        <p className="text-gray-600">Your cart is empty.</p>
      )}
    </div>
  )
}

export default Cart