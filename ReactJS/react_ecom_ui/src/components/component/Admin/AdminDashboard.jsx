import { useContext, useEffect } from "react";
import ProductList from "../ProductList"
import { GlobalContext } from "@/context/GlobalContext";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "@/apis/api";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
    const { dispatch } = useContext(GlobalContext);
    const navigate = useNavigate();
     const { data: products = [], isLoading, isError, status } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts
     });
    
    

  useEffect(() => {
    if (status === "success") {
      dispatch({ type: "SET_PRODUCTS", payload: products });
      }
  }, [status, products, dispatch]);
    
const Logout = () => {
        dispatch({ type: "LOGOUT" });
        navigate("/");
    }
    const addProduct=() => {
        navigate("/addProduct");
    }
  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error</div>
    return (
      <>
            <div className="text-center text-3xl">AdminDashboard</div>
            <Button className={"bg-red-500"} onClick={() => Logout()}>Logout</Button>
            <div className="w-11/12 text-right">
                <Button onClick={() => addProduct()}>Add Product</Button>
                </div>
            <ProductList/>
    </>
  )
}

export default AdminDashboard