import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { GlobalContext } from "@/context/GlobalContext";
import { useMutation } from "@tanstack/react-query";
import { deleteProductId, UpdateProductApi } from "@/apis/api";
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function ProductCard({ products }) {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(GlobalContext);
  const AdminLogin = state.isAuthenticated;
  const [isEditing, setIsEditing] = useState(false);
  const [product, setProduct] = useState(products);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const updateProductMutation = useMutation({
    mutationFn: (updatedProduct) => UpdateProductApi(updatedProduct.id, updatedProduct),
    onSuccess: () => {
      alert('Product updated successfully!');
      setIsEditing(false);
    },
    onError: () => {
      alert('Failed to update product.');
    }
  });

  const handleSave = () => {
    updateProductMutation.mutate(product);
  };

  const onViewProduct = (id) => {
    navigate(`/products/${id}`);
  }

  const deleteMutation = useMutation({
    mutationFn: (id) => deleteProductId(id),
    onSuccess: (data, id) => {
      alert(`Product deleted with ${id}`);
      dispatch({ type: "REMOVE_PRODUCT", payload: id });
    },
    onError: (error, id) => {
      alert(`Product Id: ${id} not deleted!`);
    }
  })

  const onDeleteProduct = (id) => {
    const deleteProduct = confirm("Do you want to delete the Product?");
    if (deleteProduct) {
      deleteMutation.mutate(id);
    }
  }

  return (
    <Card className="w-72 rounded-2xl shadow-lg p-2 m-2">
      <CardHeader>
        <img
          src={product.image}
          alt={product.title}
          className="h-40 w-full object-contain rounded-lg"
        />
        {isEditing ? (
          <Input
            name="title"
            value={product.title}
            onChange={handleChange}
            placeholder="Enter product title"
          />
        ) : (
          <CardTitle className="text-lg truncate">{product.title}</CardTitle>
        )}
        <CardDescription className="text-sm text-gray-600">{product.category}</CardDescription>
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <Input
            name="price"
            type="number"
            value={product.price}
            onChange={handleChange}
            placeholder="Enter product price"
          />
        ) : (
          <Badge className="mb-2">${product.price}</Badge>
        )}
        {isEditing ? (
          <Textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            placeholder="Enter product description"
          />
        ) : (
          <p className="text-sm line-clamp-2">{product.description}</p>
        )}
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        {!AdminLogin &&
          <Button onClick={() => onViewProduct(product.id)}>View Product</Button>}
        {AdminLogin && (
          <div className="flex flex-col gap-2">
            {isEditing ? (
              <>
                <Input
                  name="image"
                  value={product.image}
                  onChange={handleChange}
                  placeholder="Enter image URL"
                />
                <Button onClick={handleSave}>Save</Button>
              </>
            ) : (
              <Button onClick={() => setIsEditing(true)}>Update Product</Button>
            )}
            <Button onClick={() => onDeleteProduct(product.id)}>Delete Product</Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
