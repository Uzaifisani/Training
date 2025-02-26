import { fetchProducts } from "@/apis/api";
import ProductList from "@/components/component/ProductList"
import { GlobalContext } from "@/context/GlobalContext";
import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect } from "react";

const Home = () => {
    const { state, dispatch } = useContext(GlobalContext);
     const { data: products = [], isLoading, isError, status } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts
  });

  useEffect(() => {
    if (status === "success") {
      dispatch({ type: "SET_PRODUCTS", payload: products });
      dispatch({ type: "LOGOUT" });
    }
  }, [status, products, dispatch]);

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error</div>
  return (
      <div className="p-1 m-2">
          <h1 className="text-center text-3xl text-red-600 font-bold w-full bg-amber-300 p-1">Home Page</h1>
          <ProductList/>
    </div>
  )
}

export default Home