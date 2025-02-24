import { useContext, useEffect } from "react";
import { deleteProductById, fetchProductsData } from "../../scripts/products";
import { GlobalContext } from "../../context/GlobalContext";

const ManageProduct = () => {
  const selectedCategory: String = "all";
  const { state, dispatch } = useContext(GlobalContext);
  const products = state.products;

  useEffect(() => {
    fetchProductsData(selectedCategory, dispatch);
  }, [selectedCategory, dispatch]);

  const deleteProduct = async (id: number) => {
    const status: number = await deleteProductById(id);
    if (status === 200) {
      alert(`Product id ${id} is deleted successfully`);
      dispatch({ type: 'SET_PRODUCTS', payload: products.filter(product => product.id !== id) });
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      {products.map((product) => (
        <div key={product.id} className="bg-white rounded-2xl shadow-lg p-6 flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-6 mb-6">
          <div className="w-full md:w-1/3 flex justify-center">
            <img
              src={product.image}
              alt={product.title}
              className="w-48 h-auto rounded-xl shadow-md"
            />
          </div>
          <div className="w-full md:w-2/3">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              {product.title}
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              {product.description}
            </p>
            <p className="text-green-600 text-lg font-semibold mb-4">${product.price}</p>
            <button className="w-full bg-blue-500 hover:bg-green-600 text-white text-base font-medium py-3 rounded-xl shadow-md transition duration-200">
              Update
            </button>
            <button className="w-full bg-red-500 hover:bg-green-600 text-white text-base font-medium py-3 rounded-xl shadow-md transition duration-200 mt-1.5"
              onClick={() => deleteProduct(product.id)}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ManageProduct;