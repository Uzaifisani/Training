import axios from "axios";
import { LoginRegisterFormValues, LoginResponse, RegisterResponse, SingleUserResponse, User, UserResponse } from "../types";

export const login = async (creandentials: LoginRegisterFormValues): Promise<LoginResponse> => {
  const response = await axios.post<LoginResponse>("https://reqres.in/api/login", creandentials);
  return response.data.token as LoginResponse;
};

export const register = async (credentials: LoginRegisterFormValues): Promise<RegisterResponse> => {
  const response = await axios.post<RegisterResponse>("https://reqres.in/api/register", credentials);
  return response.data as RegisterResponse;
};

export const userPage= async(pageNo:Number,limit:Number):Promise<UserResponse>=>{
  const response = await axios.get<UserResponse>(`https://reqres.in/api/users?page=${pageNo}&per_page=${limit}?delay=12`);
  return response.data as UserResponse;
}

export const getAllUsers= async():Promise<UserResponse>=>{
  const response = await axios.get<UserResponse>(`https://reqres.in/api/users?per_page=12`);
  return response.data as UserResponse;
}

export const userById=async(id:number):Promise<SingleUserResponse>=>{
  const response=await axios.get<SingleUserResponse>(`https://reqres.in/api/users/${id}`);
  console.log(response.data);
  return response.data as SingleUserResponse;
}

export const addUser=async(userCreds:User):Promise<User>=>{
  const response=await axios.post<User>(`https://reqres.in/api/users`,userCreds);
  return response.data as User;
}

export const partialUpdate=async(userCreds:User):Promise<User>=>{
  const response=await axios.patch<User>(`https://reqres.in/api/users/${userCreds.id}`,userCreds);
  return response.data as User;
}

export const CompleteUpdate=async(userCreds:User):Promise<User>=>{
  const response=await axios.put<User>(`https://reqres.in/api/users/${userCreds.id}`,userCreds);
  return response.data as User;
}

export const deleteUser=async(id:number):Promise<number>=>{
  const response=await axios.delete<number>(`https://reqres.in/api/users/${id}`);
  return response.status;
}