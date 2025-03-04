import axios from "axios";
import { LoginRegisterFormValues, LoginResponse, RegisterResponse } from "../types";

export const login = async (creandentials: LoginRegisterFormValues): Promise<LoginResponse> => {
  const response = await axios.post<LoginResponse>("https://reqres.in/api/login", creandentials);
  return response.data.token as LoginResponse;
};

export const register = async (credentials: LoginRegisterFormValues): Promise<RegisterResponse> => {
  const response = await axios.post<RegisterResponse>("https://reqres.in/api/register", credentials);
  return response.data as RegisterResponse;
};

