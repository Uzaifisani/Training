import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { ICartItem, IProduct } from "../types";
import { GlobalContext } from "../context/GlobalContext";
import { fetchProductById } from "../scripts/products";

const ViewProduct = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<IProduct | null>(null);
  const { dispatch } = useContext(GlobalContext);
  const [, setCartItem] = useState<ICartItem | null>(null);
  useEffect(() => {
    const fetchAndSetProduct = async () => {
      if (id) {
        const product = await fetchProductById(Number(id));
        setProduct(product || null);
      }
    };
    fetchAndSetProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      const newCartItem: ICartItem = {
        product,
        quantity: 1,
      };
      setCartItem(newCartItem); 
      dispatch({ type: "ADD_TO_CART", payload: newCartItem });
    }
  }
    return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gray-50 ">
      <div className="w-full md:w-1/2 flex justify-center">
        <img
          src={product?.image}
          className="w-80 h-auto rounded-2xl shadow-lg"
        />
      </div>
      <div className="w-full md:w-1/2 mt-8 md:mt-0 md:ml-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          {product?.title}
        </h2>
        <p className="text-gray-600 text-base leading-relaxed mb-4">
          {product?.description}
        </p>
          <p className="text-green-600 text-2xl font-semibold mb-4">${ product?.price}</p>
        <div className="bg-gray-100 rounded-xl px-4 py-3 mb-4 text-gray-700 italic shadow-sm">
          {product?.category}
        </div>
        <button onClick={()=>handleAddToCart()} className="bg-green-500 hover:bg-green-600 text-white text-lg font-medium py-3 px-6 rounded-2xl shadow-md transition duration-200">
          Add to Cart
        </button>
      </div>
    </div>
  )
}

export default ViewProduct