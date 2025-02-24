import { useContext, useEffect, useState } from "react";
import { deleteProductById, fetchProductsData, editProduct } from "../../scripts/products";
import { GlobalContext } from "../../context/GlobalContext";
import { IProduct } from "../../types";

const ManageProduct = () => {
  const selectedCategory: String = "all";
  const { state, dispatch } = useContext(GlobalContext);
  const products = state.products;
  const [editingProductId, setEditingProductId] = useState<number | null>(null);
  const [editingProduct, setEditingProduct] = useState<IProduct | null>(null);

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

  const handleEdit = (product: IProduct) => {
    console.log(product.id);
    setEditingProductId(product.id);
    setEditingProduct(product);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (editingProduct) {
      const { name, value } = e.target;
      setEditingProduct({ ...editingProduct, [name]: value });
    }
  };

  const handleSave = async () => {
    if (editingProduct) {
      const status = await editProduct(editingProduct.id, editingProduct);
      if (status === 200) {
        alert("Product updated successfully");
        dispatch({ type: 'UPDATE_PRODUCT', payload: editingProduct });
        setEditingProductId(null);
        setEditingProduct(null);
       
      } else {
        alert("Failed to update product");
      }
    }
  };

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
            {editingProductId === product.id ? (
              <>
                <input
                  type="text"
                  name="title"
                  value={editingProduct?.title}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                />
                <input
                  type="number"
                  name="price"
                  value={editingProduct?.price}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                />
                <textarea
                  name="description"
                  value={editingProduct?.description}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                />
                <input
                  type="text"
                  name="category"
                  value={editingProduct?.category}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                />
                <input
                  type="text"
                  name="image"
                  value={editingProduct?.image}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                />
                <button
                  className="w-full bg-green-500 hover:bg-green-600 text-white text-base font-medium py-3 rounded-xl shadow-md transition duration-200"
                  onClick={handleSave}
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {product.title}
                </h2>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {product.description}
                </p>
                <p className="text-green-600 text-lg font-semibold mb-4">${product.price}</p>
                <button
                  className="w-full bg-blue-500 hover:bg-green-600 text-white text-base font-medium py-3 rounded-xl shadow-md transition duration-200"
                  onClick={() => handleEdit(product)}
                >
                  Update
                </button>
                <button
                  className="w-full bg-red-500 hover:bg-green-600 text-white text-base font-medium py-3 rounded-xl shadow-md transition duration-200 mt-1.5"
                  onClick={() => deleteProduct(product.id)}
                >
                  Delete
                </button>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ManageProduct;