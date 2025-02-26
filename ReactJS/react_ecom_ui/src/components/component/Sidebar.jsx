import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchProductCategories } from "@/apis/api";
import { DialogTitle, DialogDescription } from '@radix-ui/react-dialog';

export default function Sidebar() {
    const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);

      const {data:categories=[],isLoading,isError}=useQuery({
    queryKey: ["categories"],
    queryFn:fetchProductCategories
      })
    if (isLoading) return <h4>Loading...</h4>
    if (isError) return alert("Error");


  return (
    <div className="p-4 m-2">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">
            <Menu className="w-5 h-5" />
          </Button>
        </SheetTrigger>
              <SheetContent side="left" className="w-64 m-2 p-2">
                  <DialogTitle>ONLINE SHOPPING SITE</DialogTitle> 
      <DialogDescription>
        FREE DELIVERY ALL OVER INDIA
      </DialogDescription>
          <nav className="flex flex-col gap-4 mt-8">
            <Link to="/" className="hover:text-blue-500">Home</Link>
            <div>
              <button
                onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                className="hover:text-blue-500"
              >
                Categories
              </button>
              {isCategoriesOpen && (
                              <div className="ml-4 mt-2 flex flex-col gap-2">
                                  {categories.map((category, index)=>(
                                      <Link key={index} to={`/categories/${category}`} className="hover:text-blue-500">{category}</Link>
                                  ))}
                </div>
              )}
            </div>
            <Link to="/cart" className="hover:text-blue-500">Cart</Link>
            <Link to="/admin" className="hover:text-blue-500">Admin Panel</Link>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}
