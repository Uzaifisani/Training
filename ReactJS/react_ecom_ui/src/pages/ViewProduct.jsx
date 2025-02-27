import { addToCartApi, fetchProductsBasedId } from "@/apis/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GlobalContext } from "@/context/GlobalContext";
import { Separator } from "@radix-ui/react-separator";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const ViewProduct = () => {
  const { id } = useParams();
  const { dispatch } = useContext(GlobalContext);

  const AddToCartMutation = useMutation({
    mutationFn: (myProduct) => addToCartApi(myProduct),
    onSuccess: (data, myProduct) => {
      alert(`${myProduct.title} Has been added to Cart`);
      //console.log(myProduct);
      dispatch({ type: "ADD_TO_CART", payload: myProduct });
    },
    onError: () => {
      alert("Failed Add To Cart");
    },
  });

  const { data: product, isLoading, isError } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProductsBasedId(id),
    enabled: !!id,
  });

  // useEffect(() => {
  //   if (product) {
  //     AddToCartHandler(product);
  //   }
  // }, [product]);

  if (isLoading) return <p className="p-4 text-center">Loading product details...</p>;
  if (isError) return <p className="p-4 text-center">Error in fetching Product</p>;

  const AddToCartHandler = (myProduct) => {
    AddToCartMutation.mutate(myProduct);
  };

  return (
    <>
      <Link to={"/"}>
        <Button className="mt-2.5 w-1/6 bg-red-600 hover:bg-amber-300">
          Back
        </Button>
      </Link>
      <div className="flex justify-center items-start p-6">
        <Card className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 p-4 rounded-2xl shadow-xl">
          <CardHeader className="flex justify-center items-center">
            <img
              src={product.image}
              alt={product.title}
              className="h-80 object-contain rounded-lg"
            />
          </CardHeader>
          <CardContent className="flex flex-col justify-between">
            <div>
              <CardTitle className="text-2xl font-semibold">{product.title}</CardTitle>
              <p className="text-gray-600 capitalize mt-1">{product.category}</p>
              <p className="text-black capitalize font-bold text-2xl mt-1">{product.price}</p>
              <Separator className="my-4" />
              <p className="text-sm text-gray-700">{product.description}</p>
            </div>
            <Button className="mt-6 w-full" onClick={() => AddToCartHandler(product)}>
              Add to Cart
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default ViewProduct;