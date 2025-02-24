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
  username: string;
  isAdmin: boolean;
}
