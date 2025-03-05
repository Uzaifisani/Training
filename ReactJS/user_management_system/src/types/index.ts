export interface LoginRegisterFormValues {
    email: string;
    password: string;
  }

  export interface LoginResponse {
    token:string |unknown;
  }
  export interface RegisterResponse{
    id:number |unknown;
    token:string |unknown;
  }

  export interface AuthState {
    isAuthenticated: boolean;
    token: string | null;
    user: {
      email: string;
    } | null;
    login: (token: string, email: string) => void;
    logout: () => void;
  }

  export type FormValues = {
    email: string;
    password: string;
    confirmPassword: string;
  };

  export interface User {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    avatar: string;
  }
  
  export interface UserResponse {
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
    data: User[];
  }
  
  export interface SingleUserResponse {
    data: User;
  }
  export interface UserState {
    users: User[];
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    setPage: (page: number) => void;
    setLimit: (limit: number) => void;
    fetchUsers: () => Promise<void>;
  }

 export interface UserJob{
  name:string;
  job:string;
 }

 export interface UserJobResponse{
  name:string;
  job:string;
  id:number;
 }