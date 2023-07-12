import { createContext } from "react";
import { type Product } from "./components/Product";

export type CartItem = {
  product: Product;
  count: number;
};

export type CartProps = {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (product: Product) => void;
  removeProduct: (product: Product) => void;
  clearCart: () => void;
};

export const CartContext = createContext<CartProps>({
  cartItems: [],
  addToCart: () => "",
  removeFromCart: () => "",
  removeProduct: () => "",
  clearCart: () => "",
});
