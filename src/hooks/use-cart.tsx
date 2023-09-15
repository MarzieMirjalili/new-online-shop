import { useEffect, useState } from "react";
import { Product } from "../pages/productList/components/product/Product";
import { CartItem } from "../CartContext";

export const useCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    console.log("first");
    const temp = localStorage.getItem("items");
    if (temp) {
      const items = JSON.parse(temp);
      setCartItems(items);
    }
  }, []);

  const addToCart = (product: Product) => {
    let newCartItems = [...cartItems];
    const cartItemIndex = cartItems.findIndex(
      (c) => c.product.id === product.id
    );
    if (cartItemIndex === -1) {
      newCartItems = [...cartItems, { product, count: 1 }];
    } else {
      newCartItems[cartItemIndex].count++;
    }
    localStorage.setItem("items", JSON.stringify(newCartItems));
    setCartItems(newCartItems);
  };

  const removeFromCart = (product: Product) => {
    const newCartItems = [...cartItems];
    const cartItemIndex = cartItems.findIndex(
      (c) => c.product.id === product.id
    );
    if (newCartItems[cartItemIndex].count > 1) {
      newCartItems[cartItemIndex].count--;
      localStorage.setItem("items", JSON.stringify(newCartItems));
      setCartItems(newCartItems);
    } else {
      removeProduct(product);
    }
  };

  const removeProduct = (product: Product) => {
    const newCartItems = cartItems.filter((c) => c.product.id !== product.id);
    setCartItems(newCartItems);
    localStorage.setItem("items", JSON.stringify(newCartItems));
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.setItem("items", JSON.stringify([]));
  };

  return { cartItems, addToCart, removeFromCart, removeProduct, clearCart };
};
