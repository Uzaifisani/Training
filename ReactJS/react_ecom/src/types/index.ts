export interface IProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export interface ICartItem {
  product:IProduct
  quantity: number;
}

export interface IUser {
  id: number;
  email: string;
  username: string;
  password: string;
}
