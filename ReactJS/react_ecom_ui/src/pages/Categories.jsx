import { fetchProductByCategory, fetchProducts } from "@/apis/api";
import ProductList from "@/components/component/ProductList"
import { GlobalContext } from "@/context/GlobalContext";
import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
const Categories = () => {
    const { state, dispatch } = useContext(GlobalContext);
    const { category } = useParams();

    const { data: products = [], isLoading, isError, status } = useQuery({
    queryKey: ["products",category],
    queryFn: () => fetchProductByCategory(category),
     enabled: !!category
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
          <h1 className="text-center text-3xl text-red-600 font-bold w-full bg-amber-300">{category}</h1>
          <ProductList/>
    </div>
  )
}

export default Categories