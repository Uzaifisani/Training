import { useParams } from "react-router-dom";

const ProductList = () => {
    const { categoryName } = useParams<{ categoryName: string }>();
     console.log("categoryName");
  return (
      <>
          <h1>Category Name</h1>
          <p>{categoryName}</p>
      </>
  )
}

export default ProductList