import axios from "axios";
import { IProduct } from "../types/index";

const API_URL = "https://fakestoreapi.com";

export const fetchProducts= async ():Promise<IProduct[]>=>{
    const response = await axios.get<IProduct[]>(`${API_URL}/products`);
    return response.data as IProduct[];
}
export const fetchProductsBasedId= async (id:number):Promise<IProduct>=>{
    const response= await axios.get<IProduct>(`${API_URL}/products/${id}`);
    return response.data;
}
export const fetchProductCategories = async (): Promise<String[]> => {
    const response = await axios.get<String[]>(`${API_URL}/products/categories`);
    return response.data;
}
export const fetchProductByCategory = async (category:String): Promise<IProduct[]> => {
    const response = await axios.get<IProduct[]>(`${API_URL}/products/category/${category}`);
    return response.data;
}