import { fetchProductCategories } from "../services/api";
import { useState, useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import ProductList from "../component/ProductList";
import { useQuery } from "@tanstack/react-query";

const Home = () => {
  const { dispatch } = useContext(GlobalContext);
  const [, setSelectedCategory] = useState<string>("all");

  const { data: categories = [], isLoading, error } = useQuery<String[]>(
    ["categories"],
    fetchProductCategories
  );

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    dispatch({ type: "SET_SELECTED_CATEGORY", payload: category });
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading categories</div>;

  return (
    <>
      <div className="flex justify-between mb-8">
        <img src="https://images.pexels.com/photos/974911/pexels-photo-974911.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Image 1" className="w-1/3 mr-4" />
        <img src="https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Image 2" className="w-1/3 mr-4" />
        <img src="https://images.pexels.com/photos/298864/pexels-photo-298864.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Image 3" className="w-1/3" />
      </div>
      <div className="mb-8">
        <h2 className="text-4xl text-center font-bold mb-6">Shop by Category</h2>
        <div className="flex-wrap space-x-28 text-center p-2 m-2 mt-2">
          {["all", ...categories].map((category: String, index: number) => (
            <button
              key={`category-${index}`}
              onClick={() => handleCategoryChange(`${category}`)}
              className="text-black text-xl font-bold border-black border-2 p-2 m-1 hover:underline hover:bg-gray-500"
            >
              {category}
            </button>
          ))}
          <ProductList />
        </div>
      </div>
    </>
  );
};

export default Home;