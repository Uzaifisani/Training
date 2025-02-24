import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ICartItem, IProduct } from "../types";
import { GlobalContext } from "../context/GlobalContext";
import { fetchProductsBasedId } from "../services/api";

const ViewProduct = () => {
  const { id } = useParams<{ id: string }>();
  const { dispatch } = useContext(GlobalContext);
  const [, setCartItem] = useState<ICartItem | null>(null);

  const { data: product, isLoading, error } = useQuery<IProduct | null>(
    ["product", id],
    () => fetchProductsBasedId(Number(id)),
    { enabled: !!id }
  );

  const handleAddToCart = () => {
    if (product) {
      const newCartItem: ICartItem = {
        product,
        quantity: 1,
      };
      setCartItem(newCartItem);
      alert("Product Added to Cart");
      dispatch({ type: "ADD_TO_CART", payload: newCartItem });
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading product</div>;

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
        <p className="text-green-600 text-2xl font-semibold mb-4">${product?.price}</p>
        <div className="bg-gray-100 rounded-xl px-4 py-3 mb-4 text-gray-700 italic shadow-sm">
          {product?.category}
        </div>
        <button onClick={handleAddToCart} className="bg-green-500 hover:bg-green-600 text-white text-lg font-medium py-3 px-6 rounded-2xl shadow-md transition duration-200">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ViewProduct;