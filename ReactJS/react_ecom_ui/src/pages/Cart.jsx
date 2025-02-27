import { getCartApi } from "@/apis/api"
import CartCard from "@/components/component/CartCard"
import { GlobalContext } from "@/context/GlobalContext"
import { useQuery } from "@tanstack/react-query"
import { useContext } from "react"

const Cart = () => {
  const {state}= useContext(GlobalContext);
  const products=state.cart;
  //Get The Cart data From API 
    // const {data,isLoading,isError,isSuccess} =useQuery({
    //     queryKey:["cart"],
    //     queryFn:getCartApi,
    //     //enabled:
    // });
    // if(isLoading) return <div>Loading...</div>
    // if(isError) return <div>Error while Fetching the Cart</div>
    // console.log(data);

  return (
    <>
    <div className="text-center text-3xl border-2 p-2 m-1 rounded-md mb-3">Cart </div>
    {products.map((product,index)=>(
      <CartCard key={index} product={product}/>
      ))}
    </>
  )
}

export default Cart