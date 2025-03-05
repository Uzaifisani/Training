import axios from "axios";
import { LoginRegisterFormValues, LoginResponse, RegisterResponse, UserJob, UserJobResponse, UserResponse } from "../types";

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
  return response.data as UserResponse;
}

export const createUser= async(userCreds:UserJob):Promise<UserJobResponse>=>{
  const response= await axios.post<UserJobResponse>(`https://reqres.in/api/users`,userCreds);
  return response.data as UserJobResponse;
}

export const deleteUser= async(id:number):Promise<number>=>{
  const response=await axios.delete<number>(`https://reqres.in/api/users/${id}`);
  return response.status;
}

export const updateUser= async(id:number,userCreds:UserJob):Promise<UserJob>=>{
  const response = await axios.put<UserJob>(`https://reqres.in/api/users/${id}`,userCreds);
  return response.data as UserJob;
}