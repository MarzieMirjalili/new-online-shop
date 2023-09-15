import { FC, useContext, useEffect, useMemo, useState } from "react";
import { CartContext } from "../../CartContext";
import { CasrtItem } from "./components/cartItem/CartItem";
import { Flex } from "../../components/Flex";
import { Button } from "../../components/Button";

export const Cart: FC = () => {
  const { cartItems } = useContext(CartContext);
  const [isLoading, setIsLoading] = useState(false);
  const { clearCart } = useContext(CartContext);
  // TODO: reduce js
  const totalCount = useMemo(() => {
    let temp = 0;
    cartItems.map((c) => (temp = temp + c.count));
    return temp;
  }, [cartItems]);
  const totalPrice = useMemo(() => {
    let temp = 0;
    cartItems.map((c) => (temp = temp + c.product.price * c.count));
    return temp;
  }, [cartItems]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      clearCart();
    }, 5000);
    return () => clearTimeout(timer);
  }, [isLoading]);

  if (isLoading) {
    return <span>Loading...</span>;
  }
  return (
    <Flex
      flexDirection="column"
      alignItems="center"
      gap="20px"
      style={{ marginTop: "20px" }}
    >
      {cartItems.map((c) => (
        <CasrtItem key={c.product.id} product={c.product} count={c.count} />
      ))}
      <div>{`Total Count : ${totalCount}`}</div>
      <div>{`Total Price : ${totalPrice}`}</div>
      <Button onClick={() => setIsLoading(true)}>Chechout</Button>
    </Flex>
  );
};
export default Cart;
