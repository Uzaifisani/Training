import { IProduct, ICartItem } from "../types/index";

export interface State {
  category: String;
  products: IProduct[];
  cart: ICartItem[];
  isAuthenticated: boolean;
}

export const initialState: State = {
  category: "all",
  products: [],
  cart: [],
  isAuthenticated: false,
  // user: null
};

export type Action =
  | { type: "SET_SELECTED_CATEGORY"; payload: String }
  | { type: "SET_PRODUCTS"; payload: IProduct[] }
  | { type: "ADD_TO_CART"; payload: ICartItem }
  | { type: "REMOVE_FROM_CART"; payload: number }
  | { type: "LOGIN" }
  | { type: "LOGOUT" };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_SELECTED_CATEGORY":
      return { ...state, category: action.payload };
    case "SET_PRODUCTS":
      return { ...state, products: action.payload };
    case "ADD_TO_CART":
      return { ...state, cart: [...state.cart, action.payload] };
    case "REMOVE_FROM_CART":
      return { ...state, cart: state.cart.filter(item => item.product.id !== action.payload) };
    case "LOGIN":
      return { ...state, isAuthenticated: true };
    case "LOGOUT":
      return { ...state, isAuthenticated: false };
    default:
      return state;
  }
};
