import {  addProductApi, deleteProductId, fetchProductByCategory, fetchProducts, fetchProductsBasedId, UpdateProductApi } from "../services/api";
import { IProduct } from "../types";

export const fetchProductById = async (pid: number): Promise<IProduct | null> => {
  try {
    const response: IProduct = await fetchProductsBasedId(pid);
    return response;
  } catch (error) {
    console.error("Failed to fetch product", error);
    return null;
  }
};

export const fetchProductsData = async (selectedCategory: String, dispatch: React.Dispatch<any>) => {
  try {
    if (selectedCategory === "all") {
      const products: IProduct[] = await fetchProducts();
      dispatch({ type: 'SET_PRODUCTS', payload: products });
    } else {
      const products: IProduct[] = await fetchProductByCategory(selectedCategory);
      dispatch({ type: 'SET_PRODUCTS', payload: products });
    }
  } catch (error) {
    console.error("Failed to fetch products", error);
  }
};

export const addProduct = async (product: IProduct) => {
    const responseCode = await addProductApi(product);
    return responseCode;
}

export const editProduct = async (id: number, product: IProduct)=>{
  const responseCode = await UpdateProductApi(id, product);
  return responseCode;
}

export const deleteProductById = async (id: number) => {
    const responseCode = await deleteProductId(id);
    return responseCode;
}