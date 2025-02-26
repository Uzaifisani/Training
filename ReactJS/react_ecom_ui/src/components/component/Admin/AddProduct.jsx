import { addProductApi } from "@/apis/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@radix-ui/react-label";
import { Select, SelectTrigger } from "@radix-ui/react-select";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddProduct() {
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    title: "",
    price: "",
    category: "",
    description: "",
    image: "",
  });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = (value) => {
    setProduct({ ...product, category: value });
  };

  const addProductMutation = useMutation({
    mutationFn: (product) => addProductApi(product),
    onSuccess: () => {
      alert("Product added successfully!");
      navigate("/adminDashboard");
    },
    onError: () => {
      alert("Failed to add product.");
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addProductMutation.mutate(product);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <Card className="w-full max-w-lg rounded-2xl shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Add New Product</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <Label htmlFor="title">Product Title</Label>
              <Input
                id="title"
                name="title"
                value={product.title}
                onChange={handleChange}
                placeholder="Enter product title"
                required
              />
            </div>

            <div>
              <Label htmlFor="price">Price ($)</Label>
              <Input
                id="price"
                name="price"
                type="number"
                min="0"
                step="0.01"
                value={product.price}
                onChange={handleChange}
                placeholder="Enter product price"
                required
              />
            </div>

            <div>
              <Label className={"mr-2"}>Category:</Label>
              <Select className={"m-2"} onValueChange={handleCategoryChange} value={product.category}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="electronics">Electronics</SelectItem>
                  <SelectItem value="jewelery">Jewelery</SelectItem>
                  <SelectItem value="men's clothing">Men's Clothing</SelectItem>
                  <SelectItem value="women's clothing">Women's Clothing</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={product.description}
                onChange={handleChange}
                placeholder="Enter product description"
                rows={4}
                required
              />
            </div>

            <div>
              <Label htmlFor="image">Image URL</Label>
              <Input
                id="image"
                name="image"
                value={product.image}
                onChange={handleChange}
                placeholder="Enter image URL"
                required
              />
            </div>

            <Button type="submit" className="w-full mt-4">Add Product</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}