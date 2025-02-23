import { IProduct, ICartItem, IUser } from "../types/index";

export interface State {
  products: IProduct[];
  cart: ICartItem[];
  user: IUser | null;
}

export const initialState: State = {
  products: [],
  cart: [],
  user: null,
};

export type Action =
  | { type: "SET_PRODUCTS"; payload: IProduct[] }
  | { type: "ADD_TO_CART"; payload: ICartItem }
  | { type: "REMOVE_FROM_CART"; payload: number }
  | { type: "LOGIN"; payload: IUser }
  | { type: "LOGOUT" };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PRODUCTS":
      return { ...state, products: action.payload };
    case "ADD_TO_CART":
      return { ...state, cart: [...state.cart, action.payload] };
    case "REMOVE_FROM_CART":
      return { ...state, cart: state.cart.filter(item => item.id !== action.payload) };
    case "LOGIN":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: null };
    default:
      return state;
  }
};
