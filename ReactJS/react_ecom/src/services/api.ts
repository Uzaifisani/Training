import axios from "axios";
import { IProduct, IUser } from "../types/index";

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

export const fetchUserData = async (): Promise<IUser[]> => {
    const response = await axios.get<IUser[]>(`${API_URL}/users`);
    return response.data;
}
export const deleteProductId = async (id: number): Promise<number> => {
    const response = await axios.delete<number>(`${API_URL}/products/${id}`);
    return response.status;
}

export const addProductApi = async (product: IProduct): Promise<number> => {
    const response = await axios.post<number>(`${API_URL}/products`, product);
    return response.status;
}

export const UpdateProductApi = async (id:number,product: IProduct): Promise<number> => {
    const response = await axios.patch<number>(`${API_URL}/products/${id}`, product);
    return response.status;
}