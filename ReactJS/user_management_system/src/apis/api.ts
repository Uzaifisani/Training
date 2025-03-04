import axios from "axios";
import { LoginRegisterFormValues, LoginResponse, RegisterResponse, UserResponse } from "../types";

export const login = async (creandentials: LoginRegisterFormValues): Promise<LoginResponse> => {
  const response = await axios.post<LoginResponse>("https://reqres.in/api/login", creandentials);
  return response.data.token as LoginResponse;
};

export const register = async (credentials: LoginRegisterFormValues): Promise<RegisterResponse> => {
  const response = await axios.post<RegisterResponse>("https://reqres.in/api/register", credentials);
  return response.data as RegisterResponse;
};

export const userPage= async(pageNo:Number,limit:Number):Promise<UserResponse>=>{
  const response = await axios.get<UserResponse>(`https://reqres.in/api/users?page=${pageNo}&per_page=${limit}`);
  console.log(response.data);
  return response.data as UserResponse;
}