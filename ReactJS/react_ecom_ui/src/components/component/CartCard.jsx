import React, { useContext, useEffect, useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { GlobalContext } from '@/context/GlobalContext';
import { useMutation } from '@tanstack/react-query';
import { removeFromCart } from '@/apis/api';

const CartCard = ({ product }) => {
  const {state,dispatch}= useContext(GlobalContext);
  const [quantity,setQuantity]=useState(1);
  const removeProduct=useMutation({
    mutationFn:(cart)=>removeFromCart(cart),
    onSuccess:(data,cart)=>{
      alert(`Removed Successfully from Cart`);
    },
    onError:(data,err)=>{
      alert(err);
    }
  });

  const handleDecrease = () => {
    setQuantity((prvQ)=>prvQ-1);
  };
  const handleIncrease = () => {
    setQuantity((prvQ)=>prvQ+1);
  };
  const onRemove = (pid) => {
    dispatch({type:"REMOVE_FROM_CART",payload:pid});
    setTimeout(()=>{
      removeProduct.mutate(state.cart);
    },1000);
  };

  return (
    <Card className="flex flex-col md:flex-row items-center gap-4 p-4 mb-2 shadow-md rounded-xl">
      <img
        src={product.image}
        alt={product.title}
        className="w-20 h-20 md:w-32 md:h-32 object-contain rounded-md"
      />
      <CardContent className="flex flex-col flex-1">
        <h3 className="text-lg font-medium">{product.title}</h3>
        <p className="text-gray-600">${product.price}</p>
        <div className="flex items-center gap-2 mt-2">
          <Button size="icon" variant="outline" onClick={handleDecrease} disabled={quantity <= 1}>
            -
          </Button>
          <span className="text-lg">{quantity}</span>
          <Button size="icon" variant="outline" onClick={handleIncrease}>
            +
          </Button>
        </div>
      </CardContent>
      <Button variant="destructive" onClick={() => onRemove(product.id)}>
        Remove
      </Button>
    </Card>
  );
};

export default CartCard;