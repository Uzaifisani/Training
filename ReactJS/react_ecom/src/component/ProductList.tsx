import { useContext, useEffect } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { useNavigate } from "react-router-dom";
import { fetchProductsData } from "../scripts/products";
//import { fetchProductsData } from "../scripts/products";

const ProductList = () => {
  const { state ,dispatch} = useContext(GlobalContext);
  const selectedCategory = state.category;
    const products = state.products;
    const navigate = useNavigate();

  useEffect(() => {
    fetchProductsData(selectedCategory,dispatch);
  }, [selectedCategory, dispatch]);
    
    const handleAddToCart = (id: number) => {
         navigate(`/products/${id}`);
    };

  return (
   <>
    <h1>Category: {selectedCategory}</h1>
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {products.map(product => (
       <div key={product.id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px', width: '200px', height: '480px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <h3>{product.title}</h3>
          <img src={product.image} alt={product.title} style={{ width: '100%', height: 'auto' }} />
          {/* <p>{product.description}</p> */}
          <p>${product.price}</p>
          <button onClick={()=>handleAddToCart(product.id)}  style={{ backgroundColor: 'green', color: 'white', padding: '5px 10px', border: 'none', cursor: 'pointer' }}>
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  </>
  );
};

export default ProductList;