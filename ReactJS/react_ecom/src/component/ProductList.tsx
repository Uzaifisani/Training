import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchProductsData } from "../scripts/products";
import { IProduct } from "../types";

const ProductList = () => {
  const { state, dispatch } = useContext(GlobalContext);
  const selectedCategory = state.category;
  const navigate = useNavigate();

  const { data: products = [], isLoading, error } = useQuery<IProduct[]>(
    ["products", selectedCategory],
    () => fetchProductsData(selectedCategory)
  );

  const handleAddToCart = (id: number) => {
    navigate(`/products/${id}`);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading products</div>;

  return (
    <>
      <h1>Category: {selectedCategory}</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {products.map(product => (
          <div key={product.id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px', width: '200px', height: '480px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <h3>{product.title}</h3>
            <img src={product.image} alt={product.title} style={{ width: '100%', height: 'auto' }} />
            <p>${product.price}</p>
            <button onClick={() => handleAddToCart(product.id)} style={{ backgroundColor: 'green', color: 'white', padding: '5px 10px', border: 'none', cursor: 'pointer' }}>
             View Product
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default ProductList;