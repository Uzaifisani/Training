import { fetchProducts } from '@/apis/api';
import { GlobalContext } from '@/context/GlobalContext'
import { useQuery } from '@tanstack/react-query';
import React, { useContext, useEffect } from 'react'
import ProductCard from './ProductCard';

const ProductList = () => {
    const { state } = useContext(GlobalContext);
    const products = state.products;
  return (
    <div className='flex flex-wrap'>
      {products.map(product => (
       <ProductCard key={product.id} products={product}/>
      ))}
    </div>
  )
}

export default ProductList