export interface ICategory{
  category: string;
}
export interface IProduct {
    id: number;
    title: string;
    price: number;
    description: string;
    category: ICategory;
    image: string;
  }
  
  export interface ICartItem extends IProduct {
    quantity: number;
  }
  
  export interface IUser {
    username: string;
    isAdmin: boolean;
  }
  