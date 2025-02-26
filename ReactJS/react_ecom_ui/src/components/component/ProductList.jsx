import { fetchProducts } from '@/apis/api';
import { GlobalContext } from '@/context/GlobalContext';
import { useQuery } from '@tanstack/react-query';
import React, { useContext, useEffect, useState } from 'react';
import ProductCard from './ProductCard';


const ProductList = () => {
  const { state } = useContext(GlobalContext);
  const [sortOrder, setSortOrder] = useState('asc');
  const products = state.products;

  const sortedProducts = [...products].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.price - b.price;
    } else {
      return b.price - a.price;
    }
  });

  return (
    <div>
      <div className="mb-4">
        <label htmlFor="sortOrder" className="mr-2">Sort by price:</label>
        <select
          id="sortOrder"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
      <div className='flex flex-wrap'>
        {sortedProducts.map(product => (
          <ProductCard key={product.id} products={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;